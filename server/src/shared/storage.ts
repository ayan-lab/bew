import { db } from "./db.js";
import {
  contactSubmissions,
  RequestedReviews,
  reviews,
  user,
  type InsertContactSubmission,
  type ContactSubmission,
  User,
} from "./schema.js";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createRequestedReview(input: {
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
    projectId: number;
    rating: number;
    comment: string;
  }): Promise<{ id: number; uuid: string }>;
  approveRequestedReview(uuid: string, userId: string): Promise<"approved" | "not_found">;
  declineRequestedReview(uuid: string): Promise<"declined" | "not_found">;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }

  async createRequestedReview(input: {
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
    projectId: number;
    rating: number;
    comment: string;
  }): Promise<{ id: number; uuid: string }> {
    const [row] = await db
      .insert(RequestedReviews)
      .values({
        firstName: input.firstName,
        lastName: input.lastName,
        profilePicture: input.profilePictureUrl,
        projectId: input.projectId,
        rating: input.rating,
        comment: input.comment,
      })
      .returning({ id: RequestedReviews.id, uuid: RequestedReviews.uuid });

    return { id: row.id, uuid: row.uuid };
  }

  async approveRequestedReview(uuid: string, userId: string): Promise<"approved" | "not_found"> {
    return db.transaction(async (tx) => {
      const [requested] = await tx
        .select()
        .from(RequestedReviews)
        .where(eq(RequestedReviews.uuid, uuid))
        .limit(1);

      if (!requested) {
        return "not_found";
      }

      await tx.insert(reviews).values({
        userId: parseInt(userId, 10),
        projectId: requested.projectId,
        rating: requested.rating,
        comment: requested.comment,
      });

      await tx.delete(RequestedReviews).where(eq(RequestedReviews.id, requested.id));

      return "approved";
    });
  }

  async declineRequestedReview(uuid: string): Promise<"declined" | "not_found"> {
    const deleted = await db
      .delete(RequestedReviews)
      .where(eq(RequestedReviews.uuid, uuid))
      .returning({ id: RequestedReviews.id });

    return deleted.length > 0 ? "declined" : "not_found";
  }

  async createUser(input: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
  }): Promise<User> {
    const [row] = await db.insert(user).values(input).returning();
    return row;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [row] = await db.select().from(user).where(eq(user.email, email)).limit(1);
    if(!row){
      return null;
    }
    return row;
  }
}

export const storage = new DatabaseStorage();
