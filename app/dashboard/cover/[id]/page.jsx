"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterPreview from "../_components/CoverLetterPreview";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CoverLetters } from "../../../../utils/schema";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../utils/db";

export default function EditCoverLetterPage({ params }) {
  const { user } = useUser();
  const [coverLetter, setCoverLetter] = useState();

  useEffect(() => {
    user && GetCoverLetter();
  }, [user]);

  const GetCoverLetter = async () => {
    const letter = await db
      .select()
      .from(CoverLetters)
      .where(
        and(
          eq(CoverLetters.id, params.id),
          eq(CoverLetters.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .limit(1);
    setCoverLetter(letter[0]);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/dashboard/cover">
          <Button variant="link" className="gap-2 pl-0 text-black">
            <ArrowLeft className="h-4 w-4 text-black" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-2xl font-bold gradient-title mb-6 text-primary md:text-4xl">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <CoverLetterPreview content={coverLetter?.content} />
    </div>
  );
}
