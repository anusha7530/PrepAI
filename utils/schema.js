import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const QuizQues = pgTable("quizques", {
  id: serial("id").primaryKey(),
  jsonQuizResp: text("jsonQuizResp").notNull(),
  skills: varchar("skills").notNull(),
  difficulty: varchar("difficulty").notNull(),
  category: varchar("category").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  quizId: varchar("quizId").notNull(),
  userAns: text("userAns"),
  score: varchar("score"),
});

export const Resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  atsScore: integer("atsScore"),
  feedback: text("feedback"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});