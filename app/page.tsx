"use client";
import { convertDate } from "@/utils/convertDate";
import Navbar from "../components/common/Navbar";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { fetchNews } from "@/redux/slices/newsSlice";
import NewsCard from "@/components/common/NewsCard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { loading, newsList, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (newsList) return;
    dispatch(fetchNews());
  }, []);
  console.log(newsList?.featured?.slice(1, -1));
  return (
    <div className="w-full h-screen flex">
      <div className=" fixed z-40 top-0 left-0 bg-white bottom-0 ">
        <Navbar />
      </div>
      <div className=" flex flex-col px-2 py-2 w-full h-full pl-[105px]">
        <h1>The News</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 w-full h-full px-4 py-2">
          {newsList && newsList?.featured?.length > 0 && (
            <div className="w-full h-full">
              <div className="w-full h-fit px-2 py-4">
                <img
                  src={newsList?.featured[0]?.img}
                  alt="news"
                  className="w-[500px] h-[350px] object-fit"
                />
                <div className="flex flex-col gap-2 mt-3">
                  <span className=" flex gap-2">
                    <p>{newsList?.featured[0]?.createdBy?.name}</p>
                    <p className=" font-extrabold">|</p>
                    {convertDate(newsList?.featured[0]?.date || "NA")}
                  </span>
                  <h1 className="text-2xl font-bold text-custom-150">
                    {newsList?.featured[0].title}
                  </h1>
                  <p className="text-[16px] text-customtext-100">
                    {newsList?.featured[0]?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className=" w-full h-full flex flex-col gap-4">
            {newsList?.featured?.slice(1)?.map((item) => (
              <Link
                href={`/news/${item._id}`}
                key={item._id}
                className=" flex w-full items-start justify-center gap-3 py-1"
              >
                <div className=" w-[38%]">
                  <img
                    src={item?.img}
                    alt="news"
                    className="w-[250px] h-[140px] object-fit"
                  />
                </div>
                <div className="w-[62%] flex flex-col gap-2">
                  <span className=" flex gap-2 text-xs">
                    <p>{item?.createdBy?.name || "Anonymous"}</p>
                    <p className=" font-extrabold">|</p>
                    {convertDate(item.date || "NA")}
                  </span>
                  <h1 className="text-lg font-bold text-custom-150">
                    {item.title}
                  </h1>
                  <p className="text-sm text-customtext-100">
                    {item.description.slice(0, 100)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className=" w-full flex items-start justify-start gap-2 flex-col">
          <h1>General News</h1>
          <div className="lg:grid lg:grid-cols-4 grid-cols-1 gap-5 w-full h-full px-4 py-2">
            {newsList &&
              newsList?.general?.length > 0 &&
              newsList?.general?.map((item) => (
                <NewsCard item={item} type="vertical" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
