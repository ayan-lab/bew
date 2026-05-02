import { db } from "./db";
import {
  contactSubmissions,
  RequestedReviews,
  type InsertContactSubmission,
  type ContactSubmission,
} from "@shared/schema";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createRequestedReview(input: {
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
    projectId: number;
    rating: number;
    comment: string;
  }): Promise<{ id: number }>;
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
  }): Promise<{ id: number }> {
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
      .returning({ id: RequestedReviews.id });

    return { id: row.id };
  }
}

export const storage = new DatabaseStorage();
