"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { coverLetterSchema } from "../../../../utils/zodSchema";
import { useRouter } from "next/navigation";
import { CoverLetters } from "../../../../utils/schema";
import { db } from "../../../../utils/db";
import { chatSession } from "../../../../utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";

export default function CoverLetterGenerator() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/dashboard/cover/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const GenerateLetter = async (data) => {
    const InputPrompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.
    
    About the candidate:
    - Industry: ${data.industry}
    - Years of Experience: ${data.experience}
    - Skills: ${data.skills}
    - Professional Background: ${data.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;
    const result = await chatSession.sendMessage(InputPrompt);
    const content = result.response.text().trim();
    const coverLetter = await db
      .insert(CoverLetters)
      .values({
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning();
    setGeneratedLetter(coverLetter[0]);
  };

  const onSubmit = async (data) => {
    try {
      setGenerating(true);
      await GenerateLetter(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Necessary Details</CardTitle>
          <CardDescription>
            Provide information about the position you're applying for-
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="Technology,Manufacturing,Retail,etc"
                  {...register("industry")}
                />
                {errors.industry && (
                  <p className="text-sm text-red-500">
                    {errors.industry.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of experience</Label>
                <Input
                  id="experience"
                  placeholder="Write your YOE in the industry"
                  {...register("experience")}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500">
                    {errors.experience.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Your skills</Label>
                <Textarea
                  id="skills"
                  placeholder="C++,ReactJs,etc"
                  className="h-32"
                  {...register("skills")}
                />
                {errors.skills && (
                  <p className="text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Provide a short bio of yourself"
                  className="h-32"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-32"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={generating}>
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
