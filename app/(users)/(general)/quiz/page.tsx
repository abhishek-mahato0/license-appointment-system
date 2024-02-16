"use client";
import { examData } from "@/components/Exam/CatA";
import { signQues } from "@/components/Exam/Sign";
import React, { useState } from "react";

export default function page() {
  let n = selectRandomQuestions(examData.length - 20);
  let s = selectRandomQuestions(signQues.length - 20);
  const [question1, setQuestion1] = useState<any>(
    examData.map((ele, ind) => ({ ...ele, id: ind + 1 })).slice(n, n + 10)
  );
  const [question2, setQuestion2] = useState<any>(signQues.slice(s, s + 5));
  const questions = question1.concat(question2);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showYellow, setShowYellow] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [totalQuestion, setTotalQuestion] = useState<number>(questions.length);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  return (
    <div className=" flex w-full flex-col mt-3">
      <h1>Play Quiz</h1>
      <div>
        <p>
          {currentQuestion + 1}/{totalQuestion}
        </p>
        <p>Score :{score}</p>
      </div>
      <div className=" flex w-full flex-col items-start justify-start mt-5">
        <div className=" w-[98%] bg-custom-50 grid grid-cols-2 p-3">
          {questions[currentQuestion] &&
            [questions[currentQuestion]].map((ele: any, ind: number) => {
              return (
                <div className=" flex flex-col w-full mb-6 gap-2" key={ind}>
                  <h2 className=" flex items-center justify-start gap-2 font-semibold text-[17px] text-customtext-100">
                    <span>{currentQuestion + 1}. </span>
                    {ele.question}
                  </h2>
                  {ele?.img && (
                    <img
                      src={ele.img}
                      alt="image"
                      className="w-[120px] h-[120px] object-cover"
                    />
                  )}
                  <div className=" grid grid-cols-2 gap-3 w-[93%]">
                    {Object.keys(ele.options).map((opt: any) => {
                      return (
                        <p
                          className={`flex items-center justify-start gap-2 py-2 px-4 ml-2 rounded-[20px] cursor-pointer hover:scale-105 ${
                            showYellow == opt ? "bg-yellow-400 text-white" : ""
                          } ${
                            showAnswer && opt == ele.correct_answer
                              ? "bg-green-400 text-white"
                              : "bg-[#43a3f2] text-white"
                          }`}
                          onClick={() => {
                            setShowYellow(opt);
                            setTimeout(() => {
                              setShowAnswer(true);

                              if (opt == ele.correct_answer) {
                                setScore(score + 1);
                              }
                              setShowYellow("");
                              setTimeout(() => {
                                setShowAnswer(false);
                                setCurrentQuestion(currentQuestion + 1);
                              }, 1000);
                            }, 1000);
                          }}
                        >
                          <span>{opt}.</span>
                          {ele.options[opt]}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function selectRandomQuestions(maxLength: number) {
  return Math.floor(Math.random() * maxLength + 1);
}
