import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AddNewQuiz from "./_components/AddNewQuiz";
import QuizList from "./_components/QuizList"

const Quiz = () => {
  return (
    <div className="p-10 ">
          <h2 className="font-bold text-2xl text-center text-primary">Quizzes</h2>
          <h2 className="text-gray-500">Create and Start your AI Generated Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 my-5">
            <AddNewQuiz />
          </div>
    
          <QuizList />
        </div>
  );
};

export default Quiz;
