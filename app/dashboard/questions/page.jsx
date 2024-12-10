import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Questions = () => {
  return (
    <div className="p-10 flex flex-col gap-5 items-center justify-center">
      <p className="text-3xl font-bold">
        Upgrade to Yearly plan to get access to practice questions
      </p>
      <Link href={"/dashboard/upgrade"}>
        <Button>Upgrade</Button>
      </Link>
    </div>
  );
};

export default Questions;
