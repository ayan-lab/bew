import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { project as projectsTable } from "@shared/schema";
import { reviews as reviewsTable } from "@shared/schema";
import { user as usersTable } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const result = await storage.createContactSubmission(input);
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

  return httpServer;
}


