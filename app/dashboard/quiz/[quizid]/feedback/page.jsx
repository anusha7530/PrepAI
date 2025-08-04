"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { QuizQues } from "../../../../../utils/schema";
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
  const [quizData, setquizData] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState();
  const [quizAnswer, setQuizAnswer] = useState();
  const router = useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(QuizQues)
      .where(eq(QuizQues.quizId, params.quizid));
    setquizData(result[0]);
    const jsonQuizResp = JSON.parse(
      result[0].jsonQuizResp.match(/\[[\s\S]*\]/)?.[0]
    );
    const cleaned = result[0].userAns.replace(/^{|}$/g, "");
    const jsonanswers = cleaned
      .split(/","/)
      .map((str) => str.replace(/^"|"$/g, ""));
    setQuizAnswer(jsonanswers);
    setQuizQuestion(jsonQuizResp);
  };
  return (
    <div className="p-10">
      {!quizData ? (
        <h2 className="font-bold text-xl text-gray-500">Quiz not attempted</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>

          <h2 className="font-bold text-2xl">Here is your Quiz Score</h2>

          <h2 className="text-primary text-lg my-3">
            Score: <strong>{quizData?.score}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below all quiz questions with answers and explanation.
          </h2>

          {quizQuestion &&
            quizQuestion.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      {quizAnswer[index] &&
                      item.correctAnswer === quizAnswer[index] ? (
                        <strong className="text-green-500">
                          Correct Answer
                        </strong>
                      ) : (
                        <strong className="text-red-500">Wrong Answer</strong>
                      )}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {quizAnswer[index] ? quizAnswer[index] : "Unattempted"}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Explanation: </strong>
                      {item.explanation}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        onClick={() => router.replace("/dashboard/quiz")}
        className="mt-10"
      >
        Go to all Quizzes
      </Button>
    </div>
  );
};

export default Feedback;
