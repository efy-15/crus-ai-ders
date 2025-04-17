import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Team members
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  skills: text("skills").array(),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  twitterUrl: text("twitter_url"),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  year: text("year"),
  githubUrl: text("github_url"),
  externalUrl: text("external_url"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Contact forms
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Idea submissions
export const ideaSubmissions = pgTable("idea_submissions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  impact: text("impact").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertIdeaSubmissionSchema = createInsertSchema(ideaSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertIdeaSubmission = z.infer<typeof insertIdeaSubmissionSchema>;
export type IdeaSubmission = typeof ideaSubmissions.$inferSelect;

// Workshop registrations
export const workshopRegistrations = pgTable("workshop_registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  workshop: text("workshop").notNull(),
  preferredDate: text("preferred_date").notNull(),
  experienceLevel: text("experience_level").notNull(),
  learningGoals: text("learning_goals"),
  acceptedTerms: boolean("accepted_terms").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).omit({
  id: true,
  createdAt: true,
});

export type InsertWorkshopRegistration = z.infer<typeof insertWorkshopRegistrationSchema>;
export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;
