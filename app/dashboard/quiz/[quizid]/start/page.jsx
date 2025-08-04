"use client";
import React, { useEffect, useState } from "react";
import { QuizQues } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const StartQuiz = ({ params }) => {
  const router = useRouter();
  const [quizQuestion, setQuizQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetQuizDetails();
  }, []);
  useEffect(() => {
    if (quizQuestion) {
      setAnswers(new Array(quizQuestion.length).fill(null));
    }
  }, [quizQuestion]);

  const GetQuizDetails = async () => {
    const result = await db
      .select()
      .from(QuizQues)
      .where(eq(QuizQues.quizId, params.quizid));
    const jsonQuizResp = JSON.parse(
      result[0].jsonQuizResp.match(/\[[\s\S]*\]/)?.[0]
    );
    if (!jsonQuizResp) {
      console.error("Invalid or missing response");
      return;
    }
    setQuizQuestion(jsonQuizResp);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[activeQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    let score = calculateScore();

    const resp = await db
      .update(QuizQues)
      .set({
        userAns: answers,
        score: score,
      })
      .where(eq(QuizQues.quizId, params.quizid));

    if (resp) {
      toast("Quiz completed successfully.");
      router.push("/dashboard/quiz/" + params.quizid + "/feedback");
    }
    setLoading(false);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizQuestion[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div>
      {quizQuestion ? (
        <div className="p-5 border rounded-lg my-10">
          <Card className="mx-2">
            <CardHeader>
              <CardTitle>Question {activeQuestionIndex + 1} of 10</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-medium">
                {quizQuestion[activeQuestionIndex]?.question}
              </p>
              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[activeQuestionIndex]}
                className="space-y-2"
              >
                {quizQuestion[activeQuestionIndex].options?.map(
                  (option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <LoaderCircle className="animate-spin" />
          'Quiz Loading..'
        </>
      )}
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != quizQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == quizQuestion?.length - 1 && (
          <Button onClick={UpdateUserAnswer}>
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                'Evaluating'
              </>
            ) : (
              "Finish Quiz"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartQuiz;
