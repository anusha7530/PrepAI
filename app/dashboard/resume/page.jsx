"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Resumes } from "../../../utils/schema";
import { db } from "../../../utils/db";
import ResumeBuilder from "./_components/resume-builder";
import { eq } from "drizzle-orm";

export default function ResumePage() {
  const { user } = useUser();
  const [resume, setResume] = useState();

  useEffect(() => {
    user && GetResume();

  }, [user]);
  
  const GetResume = async () => {
    const result = await db
      .select()
      .from(Resumes)
      .where(eq(Resumes.createdBy, user?.primaryEmailAddress?.emailAddress));
      setResume(result[0]);
  };

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
