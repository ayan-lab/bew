import type { Express, NextFunction, Request, Response } from "express";
import type { Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { api } from "./shared/routes";
import { z } from "zod";
import { project as projectsTable, client as clientsTable, services } from "./shared/schema";
import { reviews as reviewsTable } from "./shared/schema";
import { user as usersTable } from "./shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { uploadProfileImage } from "./cloudinary-upload";
import { sendEnquiryEmail } from "./email/maileroo.js";

const profileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, or GIF images are allowed."));
    }
  },
});

function handleProfileUpload(req: Request, res: Response, next: NextFunction) {
  profileUpload.single("profilePicture")(req, res, (err?: unknown) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Image must be 5MB or smaller." });
      }
      const message = err instanceof Error ? err.message : "Invalid file upload.";
      return res.status(400).json({ message });
    }
    next();
  });
}

const createProjectReviewBodySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  rating: z.coerce.number().int().min(1, "Rating is required").max(5),
  comment: z.string().min(1, "Comment is required"),
});


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const result = await storage.createContactSubmission(input);

      try {
        await sendEnquiryEmail({
          name: result.name,
          email: result.email,
          message: result.message,
        });
      } catch (emailErr) {
        console.error("Enquiry email failed:", emailErr);
      }

      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error('Contact submission error:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/projects", async (_req, res) => {
    try {
      const rows = await db.select().from(projectsTable);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Projects error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    try {
      const rows = await db.select().from(projectsTable).where(eq(projectsTable.id, id)).limit(1);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error("Project detail error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(
    "/api/projects/:id/reviews",
    handleProfileUpload,
    async (req, res) => {
      const projectId = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project id" });
      }

      let parsed: z.infer<typeof createProjectReviewBodySchema>;
      try {
        parsed = createProjectReviewBodySchema.parse(req.body);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0]?.message ?? "Validation failed",
            field: err.errors[0]?.path.join("."),
          });
        }
        throw err;
      }

      try {
        const [projectRow] = await db
          .select({ id: projectsTable.id })
          .from(projectsTable)
          .where(eq(projectsTable.id, projectId))
          .limit(1);
        if (!projectRow) {
          return res.status(404).json({ message: "Project not found" });
        }

        let profilePictureUrl: string | null = null;
        if (req.file?.buffer) {
          profilePictureUrl = await uploadProfileImage(req.file.buffer, {
            folder: "bew/profile-pictures",
          });
        }

        const result = await storage.createRequestedReview({
          firstName: parsed.firstName,
          lastName: parsed.lastName,
          profilePictureUrl,
          projectId,
          rating: parsed.rating,
          comment: parsed.comment,
        });

        return res.status(201).json(result);
      } catch (err) {
        if (err instanceof Error && err.message.includes("Cloudinary")) {
          console.error("Cloudinary upload error:", err);
          return res.status(500).json({ message: err.message });
        }
        console.error("Create review error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  );

  app.get("/api/clients", async (_req, res) => {
    try {
      const rows = await db.select().from(clientsTable);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Clients error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/reviews/:projectId", async (req, res) => {
    const projectId = Number.parseInt(req.params.projectId, 10);
    if (Number.isNaN(projectId)) {
      return res.status(400).json({ message: "Invalid project id" });
    }
  
    try {
      const rows = await db
        .select({
          id: reviewsTable.id,
          userId: reviewsTable.userId,
          projectId: reviewsTable.projectId,
          rating: reviewsTable.rating,
          comment: reviewsTable.comment,
          createdAt: reviewsTable.createdAt,
          user: {
            id: usersTable.id,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            profilePicture: usersTable.profilePicture,
          },
        })
        .from(reviewsTable)
        .innerJoin(usersTable, eq(reviewsTable.userId, usersTable.id))
        .where(eq(reviewsTable.projectId, projectId));
      return res.status(200).json(rows);
    } catch (err) {
      console.error("Reviews error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/services", async (_req, res) => {
    try {
      const rows = await db.select().from(services);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Services error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}


  