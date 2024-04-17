"use client";
import { examData } from "@/components/Exam/CatA";
import { signQues } from "@/components/Exam/Sign";
import QuizModal from "@/components/common/Examination/QuizModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import PaginationComp from "@/components/common/PaginationComp";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { categoryData } from "@/components/data/CategoryData";
import QuizLoader from "@/components/loaders/QuizLoader";
import { apiinstance } from "@/services/Api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";

let typeOptions = [
  {
    id: 1,
    name: "General",
    value: "general",
  },
  {
    id: 2,
    name: "Traffic Signs",
    value: "sign",
  },
];
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>("all");
  const [selectedType, setSelectedType] = useState<any>("all");
  const categoryParams = useSearchParams().get("category") || "all";
  const typeParams = useSearchParams().get("type") || "all";
  const page = useSearchParams().get("page");
  const [data, setData] = useState<any>([]);

  async function getQuestions() {
    try {
      setLoading(true);
      const res = await apiinstance.get(
        `/user/question?category=${selectedCategory}&type=${typeParams}&page=${page}`
      );
      return setData({
        total: res.data?.total,
        current: page,
        previous: Number(page) - 1,
        next: Number(page) + 1,
        ques: res.data?.questions,
      });
    } catch (error: any) {
      return null;
    } finally {
      setLoading(false);
    }
  }
  useMemo(() => {
    getQuestions();
  }, [categoryParams, typeParams, page]);
  return (
    <Suspense>
      <div className=" flex flex-col w-full items-start justify-start md:mt-1 mt-4">
        <HeaderTitle title="Prepare for Exam" />
        <div className=" w-[98%] flex justify-end mb-4">
          <div className=" md:w-[55%] w-full grid md:grid-cols-3 grid-cols-1 items-center justify-end gap-3">
            <QuizModal />
            <SingleSelect
              data={categoryData.map((ele) => ({
                id: ele.id,
                name: ele.name,
                value: ele.category,
              }))}
              placeholder="Select Category"
              all={true}
              onSelect={(value: any) => {
                setSelectedCategory(value);
                router.push(
                  `prepare?category=${value}&type=${typeParams}&page=1`
                );
              }}
            />
            <SingleSelect
              data={typeOptions}
              placeholder="Select Type"
              onSelect={(value: any) =>
                router.push(
                  `prepare?category=${categoryParams}&type=${value}&page=1`
                )
              }
            />
          </div>
        </div>
        <div className=" w-[98%] bg-custom-50 grid grid-cols-1 py-6 px-8 gap-6">
          {loading ? (
            <QuizLoader />
          ) : data?.ques && data?.ques?.length <= 0 ? (
            <div className="flex items-center justify-center w-full h-[200px] bg-white rounded-lg shadow-md">
              <h2 className="text-[18px] text-gray-500">
                No Questions to display.
              </h2>
            </div>
          ) : (
            data?.ques?.map((ele: any, ind: number) => {
              return (
                <div className=" flex flex-col w-full mb-6 gap-3" key={ind}>
                  <h2 className=" flex items-center justify-start gap-2 font-semibold text-[18px] text-gray-600">
                    <span>
                      {parseInt(page ? page : "1") > 1
                        ? parseInt(page ? page : "1") * 10 - 10 + ind + 1
                        : ind + 1}
                      .{" "}
                    </span>
                    {ele?.question}
                  </h2>
                  {ele?.img && (
                    <img
                      src={ele.img}
                      alt="image"
                      className="w-[120px] h-[120px] object-cover"
                    />
                  )}
                  <div className=" grid grid-cols-2 gap-3">
                    {Object.keys(ele.answers).map((opt: any) => {
                      return (
                        <p
                          className={`flex items-center justify-start gap-2 py-2 px-4 ml-2 rounded-[20px] ${
                            opt == ele.correct_answer
                              ? "bg-green-400 text-white"
                              : "bg-[#43a3f2] text-white"
                          }`}
                        >
                          <span>{opt}.</span>
                          {ele?.answers[opt]}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className=" absolute -bottom-20 right-3">
          {data?.total && (
            <PaginationComp
              total={data?.total}
              current={page ? Number(page) : 1}
              params="page"
              previous={data?.previous}
              next={data?.next}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
}
