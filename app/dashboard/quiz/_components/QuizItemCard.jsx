import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const QuizItemCard = ({ quiz }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/quiz/" + quiz.quizId + "/start");
  };
  const onFeedbackPress = () => {
    router.push("/dashboard/quiz/" + quiz.quizId + "/feedback");
  };
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{quiz?.skills}</h2>
      <h2 className="text-sm text-gray-600">
        {quiz?.score ? `Score : ${quiz?.score}/10` : `Score : 0/10`}
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {quiz?.createdAt}
      </h2>

      <div className="flex justify-between mt-2 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedbackPress}
        >
          Explanation
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuizItemCard;
