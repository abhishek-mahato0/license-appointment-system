"use client";
import { examData } from "@/components/Exam/CatA";
import { signQues } from "@/components/Exam/Sign";
import { PopupModal } from "@/components/common/PopupModal";
import { Button } from "@/components/ui/button";
import { apiinstance } from "@/services/Api";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function QuizModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any>([]);

  async function getQuestions() {
    try {
      setLoading(true);
      const res = await apiinstance.get(`/user/question?preparation=quiz`);
      return setQuestions(res.data);
    } catch (error: any) {
      return null;
    } finally {
      setLoading(false);
    }
  }
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showYellow, setShowYellow] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [totalQuestion, setTotalQuestion] = useState<number>(
    questions?.length || 15
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  useLayoutEffect(() => {
    getQuestions();
  }, []);
  function playAgain() {
    getQuestions();
    setScore(0);
    setCurrentQuestion(0);
    setShowAnswer(false);
    setShowYellow("");
  }
  useEffect(() => {
    currentQuestion >= totalQuestion &&
      document.getElementById("popover")?.click();
  }, [currentQuestion, totalQuestion]);
  return (
    <PopupModal
      btnText=""
      isHidden={true}
      btnclassNames=" mr-2"
      onClick={() => {}}
      title="Play Quiz"
      triggerChildren={
        <Button type="submit" className=" bg-green-700 text-white">
          Play Quiz
        </Button>
      }
    >
      {/* <h1 className=" text-2xl font-bold text-custom-150">Play Quiz</h1> */}
      <PopupModal
        btnclassNames=" hidden"
        triggerChildren={
          <p id="popover" className=" hidden">
            Popover
          </p>
        }
        btnText="Play Again"
        cancelFunction={() =>
          router.push(`prepare?category=A&type=sign&page=1`)
        }
        cancelText="Go to Preparation"
        title="Quiz Completed"
        description="Thanks for playing the quiz"
        onClick={playAgain}
      >
        <div className=" flex flex-col gap-3">
          <p>
            You have completed the quiz. Your score is{" "}
            <span className=" text-green-700">{score}</span> out of 15. You can
            play the quiz again or go to the preparation page.
          </p>
        </div>
      </PopupModal>

      <div className=" flex w-full h-fit flex-col items-center justify-start">
        <div className=" w-full h-full bg-custom-50 flex flex-col items-center justify-start px-2">
          <div className=" w-full flex items-start justify-start mb-4 gap-5 font-bold text-xl">
            <p className=" text-customtext-100">
              Score: <span className=" text-custom-150">{score}</span>
            </p>
            <p className=" text-customtext-100">
              Level:{" "}
              <span className=" text-custom-150">
                {currentQuestion < 5
                  ? "Easy"
                  : currentQuestion < 10
                  ? "Medium"
                  : "Hard"}
              </span>
            </p>
          </div>
          {questions[currentQuestion] &&
            [questions[currentQuestion]].map((ele: any, ind: number) => {
              return (
                <div className=" flex flex-col w-full gap-4" key={ind}>
                  <h2 className=" flex items-start justify-start gap-2 font-semibold text-[16px] text-customtext-100">
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
                  <div className=" grid grid-cols-2 gap-3 w-full">
                    {Object.keys(ele.answers).map((opt: any) => {
                      return (
                        <div
                          className={`flex items-center text-[14px] justify-start gap-2 py-2 px-4 ml-2 rounded-[20px] cursor-pointer hover:scale-105 ${
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
                          {ele.answers[opt]}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          <div className=" flex w-full items-center justify-end mt-5">
            <p>
              Question
              <span className=" ml-3">
                {currentQuestion + 1}/{totalQuestion}
              </span>
            </p>
          </div>
        </div>
      </div>
    </PopupModal>
  );
}

function selectRandomQuestions(maxLength: number) {
  return Math.floor(Math.random() * maxLength + 1);
}
