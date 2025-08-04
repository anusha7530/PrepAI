"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../../../utils/GeminiAIModal";
import { db } from "../../../../utils/db";
import { QuizQues } from "../../../../utils/schema";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewQuiz = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState(false);
  const [skills, setSkills] = useState(false);
  const [difficulty, setDifficulty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const InputPrompt = `
    Generate 10 ${category} interview questions for all these topics- ${skills} having difficulty ${difficulty}.
    Each question should be multiple choice with 4 options.
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
    const result = await chatSession.sendMessage(InputPrompt);
    const QuizjsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    setJsonResponse(QuizjsonResp);
    if (QuizjsonResp) {
      const resp = await db
        .insert(QuizQues)
        .values({
          quizId: uuidv4(),
          jsonQuizResp: QuizjsonResp,
          skills: skills,
          difficulty: difficulty,
          category: category,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ quizId: QuizQues.quizId });
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/quiz/" + resp[0]?.quizId +"/start");
      }
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the quiz
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add the category, topics and difficulty level for the quiz.
                  </h2>
                  <div className="mt-7 my-2">
                    <label>Category</label>
                    <Input
                      placeholder="Technical/Behavioral"
                      required
                      onChange={(event) => setCategory(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Topics</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJS, etc"
                      required
                      onChange={(event) => setSkills(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-2">
                    <label>Difficulty Level</label>
                    <Input
                      placeholder="Easy/Medium/Hard"
                      required
                      onChange={(event) => setDifficulty(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setOpenDialog(false);
                      setLoading(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Quiz"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewQuiz;


// {
//   "questions": [
//     {
//       "question": "What is the result of the following C++ expression: `5 + 3 * 2`?",
//       "options": ["16", "11", "10", "13"],
//       "correctAnswer": "11",
//       "explanation": "According to operator precedence, multiplication (`*`) is performed before addition (`+`). So, `3 * 2` is `6`, and then `5 + 6` equals `11`."
//     },
//     {
//       "question": "Which C++ keyword is used to define a constant variable?",
//       "options": ["static", "volatile", "const", "final"],
//       "correctAnswer": "const",
//       "explanation": "The `const` keyword is used to declare a variable whose value cannot be changed after initialization, making it a constant."
//     },
//     {
//       "question": "What is the output of the following C++ code snippet?\ncpp\nint x = 10;\nif (x > 5)\n  std::cout << \"Hello\";\nelse\n  std::cout << \"World\";\n```",
//       "options": ["Hello", "World", "HelloWorld", "Nothing"],
//       "correctAnswer": "Hello",
//       "explanation": "The condition `x > 5` (which is `10 > 5`) evaluates to `true`, so the code inside the `if` block, `std::cout << \"Hello\";`, is executed."
//     },
//     {
//       "question": "How many times will the message \"C++\" be printed by the following `for` loop?\n```cpp\nfor (int i = 0; i < 4; ++i) {\n  std::cout << \"C++\";\n}\n```",
//       "options": ["3", "4", "5", "0"],
//       "correctAnswer": "4",
//       "explanation": "The loop variable `i` starts at 0 and increments until it is no longer less than 4. This means `i` will take values 0, 1, 2, and 3, executing the loop body 4 times."
//     },
//     {
//       "question": "Which of the following is the correct way to declare an array named `scores` that can hold 10 integer values?",
//       "options": ["int scores[];", "array<int> scores[10];", "int scores[10];", "int[] scores = new int[10];"],
//       "correctAnswer": "int scores[10];",
//       "explanation": "In C++, an array is declared by specifying the data type, followed by the array name, and then the size in square brackets, e.g., `int scores[10];`."
//     },
//     {
//       "question": "What is the primary purpose of a function in C++?",
//       "options": ["To define a new variable", "To encapsulate a block of code for reusability", "To declare a class", "To include header files"],
//       "correctAnswer": "To encapsulate a block of code for reusability",
//       "explanation": "Functions are used to break down a program into smaller, manageable, and reusable blocks of code, promoting modularity and reducing redundancy."
//     },
//     {
//       "question": "Which operator is used for comparison (checking if two values are equal) in C++?",
//       "options": ["=", "!=", "==", "><"],
//       "correctAnswer": "==",
//       "explanation": "The `==` (equality) operator is used to compare if two values are equal. The `=` operator is for assignment."
//     },
//     {
//       "question": "What does `std::endl` do in C++?",
//       "options": ["It adds a space and then flushes the output buffer.", "It adds a new line character and then flushes the output buffer.", "It only adds a new line character.", "It clears the console screen."],
//       "correctAnswer": "It adds a new line character and then flushes the output buffer.",
//       "explanation": "`std::endl` inserts a newline character into the output stream and then flushes (forces immediate writing of) the stream's buffer."
//     },
//     {
//       "question": "Which of the following is a correct multi-line comment in C++?",
//       "options": ["// This is a comment //", "/* This is a comment */", "# This is a comment #", "<!-- This is a comment -->"],
//       "correctAnswer": "/* This is a comment */",
//       "explanation": "Multi-line comments in C++ start with `/*` and end with `*/`. All text between these markers is ignored by the compiler."
//     },
//     {
//       "question": "What is the data type of the value `3.14` in C++ by default?",
//       "options": ["int", "float", "double", "long double"],
//       "correctAnswer": "double",
//       "explanation": "Floating-point literals in C++ (like `3.14`) are treated as `double` by default unless explicitly specified with a suffix (e.g., `3.14f` for float)."
//     }
//   ]
// }
// ```