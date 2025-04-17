import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertIdeaSubmissionSchema, insertWorkshopRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Team members API
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getAllTeamMembers();
      res.status(200).json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Projects API
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json({ message: "Contact submission received", id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Idea submission
  app.post("/api/ideas", async (req, res) => {
    try {
      const validatedData = insertIdeaSubmissionSchema.parse(req.body);
      const submission = await storage.createIdeaSubmission(validatedData);
      res.status(201).json({ message: "Idea submission received", id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit idea" });
      }
    }
  });

  // Workshop registration
  app.post("/api/workshops/register", async (req, res) => {
    try {
      const validatedData = insertWorkshopRegistrationSchema.parse(req.body);
      const registration = await storage.createWorkshopRegistration(validatedData);
      res.status(201).json({ message: "Workshop registration successful", id: registration.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to register for workshop" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // Simple email validation
      const emailSchema = z.string().email();
      emailSchema.parse(email);
      
      await storage.subscribeToNewsletter(email);
      res.status(201).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid email address" });
      } else {
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
