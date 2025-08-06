import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Mocks = () => {
  return (
    <div className="p-10 ">
      <h2 className="font-bold gradient-title text-5xl md:text-6xl text-primary">
        Mock Interviews
      </h2>
      <h2 className="text-gray-500">Create and Start your AI Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  );
};

export default Mocks;
