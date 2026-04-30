import { pgTable, text, serial, varchar, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").notNull().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


// DB table name matches migrations/meta snapshot ("projects"); export stays `project`.
export const project = pgTable("projects", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  client: varchar("client", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  image: varchar("image", { length: 255 }).array().notNull(),
  status: varchar("status", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").notNull().defaultRandom(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => user.id),
  projectId: integer("project_id").notNull().references(() => project.id),
  rating: integer("rating").notNull().default(0),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const RequestedReviews = pgTable("requested_reviews", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").notNull().defaultRandom(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).default(""),
  profilePicture: varchar("profile_picture", { length: 255 }),
  projectId: integer("project_id").notNull().references(() => project.id),
  rating: integer("rating").notNull().default(0),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Users can have many reviews
export const userRelations = relations(user, ({ many }) => ({
  reviews: many(reviews),
}));

// Projects can have many reviews
export const projectRelations = relations(project, ({ many }) => ({
  reviews: many(reviews),
}));

// Each review belongs to one user and one project
export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(user, {
    fields: [reviews.userId],
    references: [user.id],
  }),
  project: one(project, {
    fields: [reviews.projectId],
    references: [project.id],
  }),
}));

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;

export const insertUserSchema = createInsertSchema(user).omit({ id: true, createdAt: true, updatedAt: true });
export type User = typeof user.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertReviewSchema = createInsertSchema(reviews).omit({ 
  id: true, 
  createdAt: true 
});

export type Project = typeof project.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
