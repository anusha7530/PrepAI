"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/CoverLetterList";
import { useUser } from "@clerk/nextjs";
import { CoverLetters } from "../../../utils/schema";
import { db } from "../../../utils/db";
import { eq } from "drizzle-orm";

export default function CoverLetterPage() {
  const { user } = useUser();
  const [coverLetters, setCoverLetters] = useState();

  useEffect(() => {
    user && GetCoverLetters();
  }, [user]);
  
  const GetCoverLetters = async () => {
    const result = await db
      .select()
      .from(CoverLetters)
      .where(eq(CoverLetters.createdBy, user?.primaryEmailAddress?.emailAddress));
      setCoverLetters(result);
  };

  return (
    <div className="p-10 ">
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-4xl font-bold gradient-title text-primary md:text-6xl">My Cover Letters</h1>
        <Link href="/dashboard/cover/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetter={coverLetters} />
    </div>
  );
}