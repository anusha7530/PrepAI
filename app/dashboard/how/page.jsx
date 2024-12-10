import React from "react";
import howItWorks from "../../../utils/howItWorks";

const How = () => {
  return (
    <div className="m-10">
      <h2 className="text-3xl font-bold">How it Works?</h2>
      <div className="m-5 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {howItWorks.map((item, index) => (
          <div
            className=" flex flex-col h-32 rounded-lg bg-gray-200 text-black p-3"
            key={index}
          >
            <h1 className="text-xl font-bold">{item.title}</h1>
            <p className="my-2 text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default How;
