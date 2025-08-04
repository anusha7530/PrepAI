"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const [avgRating, setAvgRating] = useState();
  useEffect(() => {
    GetFeedback();
  }, []);
  useEffect(() => {
    calculateRating();
  }, [feedbackList]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };
  const calculateRating = () => {
    let sum = 0;
    let n = feedbackList.length;
    for (let i = 0; i < n; i++) {
      let rate = parseInt(feedbackList[i].rating, 10);
      sum = sum + rate;
    }
    let avg = sum / feedbackList.length;
    let roundedAvg = parseFloat(avg.toFixed(2));
    setAvgRating(roundedAvg);
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>

          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{avgRating}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below all interview questions with accurate possible answers,
            your answer and feedback for improvement.
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard/mocks")} className="mt-10">
        Go to all Mock Interviews
      </Button>
    </div>
  );
};

export default Feedback;
