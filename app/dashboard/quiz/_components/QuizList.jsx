"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { QuizQues } from "../../../../utils/schema";
import { desc, eq } from "drizzle-orm";
import QuizItemCard from "./QuizItemCard";

const QuizList = () => {
  const { user } = useUser();
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    user && GetQuizList();
  }, [user]);

  const GetQuizList = async () => {
    const result = await db
      .select()
      .from(QuizQues)
      .where(eq(QuizQues.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(QuizQues.id));

    setQuizList(result);
  };
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {quizList &&
          quizList.map((quiz, index) => (
            <QuizItemCard key={index} quiz={quiz} />
          ))}
      </div>
    </div>
  );
};

export default QuizList;
