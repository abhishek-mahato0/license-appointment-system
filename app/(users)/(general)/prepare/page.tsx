"use client";
import { examData } from "@/components/Exam/CatA";
import { general } from "@/components/Exam/General";
import { signQues } from "@/components/Exam/Sign";
import QuizModal from "@/components/common/Examination/QuizModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import PaginationComp from "@/components/common/PaginationComp";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { categoryData } from "@/components/data/CategoryData";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

let typeOptions = [
  {
    id: 1,
    name: "General",
    value: "general",
  },
  {
    id: 2,
    name: "Traffic Signs",
    value: "signs",
  },
];
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedType, setSelectedType] = useState<any>("");
  const categoryParams = useSearchParams().get("category");
  const typeParams = useSearchParams().get("type");
  const page = useSearchParams().get("page");
  const [data, setData] = useState<any>([]);
  useMemo(() => {
    setLoading(true);
    if (categoryParams && typeParams) {
      if (typeParams === "signs") {
        return setData({
          total: Math.round(signQues.length / 5),
          current: page,
          previous: Number(page) - 1,
          next: Number(page) + 1,
          ques: signQues.map((ele: any, ind: Number) => ({
            ...ele,
            id: ind,
          })),
        });
      } else if (typeParams === "general" && categoryParams === "all") {
        return setData({
          total: Math.round(examData.length / 5),
          current: page,
          previous: Number(page) - 1,
          next: Number(page) + 1,
          ques: examData.map((ele: any, ind: Number) => ({
            ...ele,
            id: ind,
          })),
        });
      } else if (categoryParams != "all" && typeParams != "signs") {
        return setData({
          total: Math.round(examData.length / 5),
          current: page,
          previous: Number(page) - 1,
          next: Number(page) + 1,
          ques:
            examData
              .map((ele: any, ind: Number) => ({ ...ele, id: ind }))
              .filter((ele) => ele.category.includes(categoryParams)).length > 5
              ? examData
                  .map((ele: any, ind: Number) => ({ ...ele, id: ind }))
                  .filter((ele) => ele.category.includes(categoryParams))
              : examData.map((ele: any, ind: Number) => ({
                  ...ele,
                  id: ind,
                })),
        });
      }
      return setData({
        total: Math.round(examData.length / 5),
        current: page,
        previous: Number(page) - 1,
        next: Number(page) + 1,
        ques: examData.map((ele: any, ind: Number) => ({ ...ele, id: ind })),
      });
    } else {
      return setData({
        total: Math.round(examData.length / 5),
        current: page,
        previous: Number(page) - 1,
        next: Number(page) + 1,
        ques: examData.map((ele: any, ind: Number) => ({ ...ele, id: ind })),
      });
    }
  }, [categoryParams, typeParams]);

  useEffect(() => {
    if (!data) return;
    if (!page) {
      setLoading(false);
      return setData({
        total: Math.round(data?.ques?.length / 5),
        current: page,
        previous: Number(page) - 1,
        next: Number(page) + 1,
        ques: data?.ques?.slice(0, 5),
      });
    }
    setLoading(false);
    return setData({
      total: Math.floor(data?.ques?.length / 5),
      current: page,
      previous: Number(page) - 1,
      next: Number(page) + 1,
      ques: data?.ques?.slice(
        (Number(page) - 1) * 5,
        (Number(page) - 1) * 5 + 5
      ),
    });
  }, [page, categoryParams, typeParams]);
  return (
    <div className=" flex flex-col w-full items-start justify-start mt-1">
      <HeaderTitle title="Prepare for Exam" />
      <div className=" w-full flex justify-end p-4">
        <div className=" w-[55%] grid grid-cols-3 items-center justify-end gap-3">
          {/* <Button
            type="submit"
            className=" bg-green-700 text-white"
            onClick={() => router.push(`quiz?category=${categoryParams}`)}
          >
            Play Quiz
          </Button> */}
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
      <div className=" w-[98%] bg-custom-50 grid grid-cols-2 p-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data?.ques &&
          data?.ques.slice(0, 5).map((ele: any, ind: number) => {
            return (
              <div className=" flex flex-col w-full mb-6 gap-2" key={ind}>
                <h2 className=" flex items-center justify-start gap-2 font-semibold text-[17px] text-customtext-100">
                  <span>{ele.id + 1}. </span>
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
                        className={`flex items-center justify-start gap-2 py-2 px-4 ml-2 rounded-[20px] ${
                          opt == ele.correct_answer
                            ? "bg-green-400 text-white"
                            : "bg-[#43a3f2] text-white"
                        }`}
                      >
                        <span>{opt}.</span>
                        {ele.options[opt]}
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
  );
}
