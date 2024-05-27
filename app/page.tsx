"use client";
import { convertDate } from "@/utils/convertDate";
import Navbar from "../components/common/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { fetchallNews, fetchNews } from "@/redux/slices/newsSlice";
import NewsCard from "@/components/common/NewsCard";
import Loader from "@/components/common/dashboard/Loader";
import HeaderTitle from "@/components/common/HeaderTitle";
import SmallNav from "@/components/common/SmallNavbar";
import Appear from "@/components/FramerMotion/Appear";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const dispatch = useAppDispatch();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const { loading, newsList, error } = useAppSelector((state) => state.news);
  const allNews = useAppSelector((state) => state.news.allNews);

  useEffect(() => {
    if (newsList) return;
    dispatch(fetchNews({ to: "", from: "" }));
    // if (to && from) return;
    // dispatch(fetchallNews({ to: "", from: "" }));
  }, []);

  useEffect(() => {
    dispatch(fetchallNews({ to, from }));
  }, [to, from]);

  return (
    <div className="w-full h-full flex mb-[30px]">
      <div className=" fixed z-40 top-0 left-0 bg-white md:bottom-0 ">
        <Navbar />
        <SmallNav />
      </div>
      <div className="flex flex-col px-2 py-2 w-full h-full md:pl-[105px] lg:pt-0">
        <div className=" flex w-full fixed top-0 bg-white py-2 z-20">
          <HeaderTitle title="Today's News" />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Appear className="grid lg:grid-cols-5 grid-cols-1 gap-10 w-full h-full px-4 pt-[80px]">
            {newsList && newsList?.featured?.length > 0 && (
              <div className="w-full h-full shadow-xl lg:col-span-3">
                <div className="w-full h-fit">
                  <img
                    src={newsList?.featured[0]?.img}
                    alt="news"
                    className="w-full h-[370px] object-fit"
                  />
                  <div className="flex flex-col gap-2 mt-3 px-4 pt-2 pb-4">
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
            <div className=" w-full h-full flex flex-col gap-4 col-span-2">
              {newsList?.featured?.slice(1)?.map((item) => (
                <Link
                  href={`/news/${item._id}`}
                  key={item._id}
                  className=" flex w-full items-center justify-center gap-3 py-1 hover:scale-105 duration-75 drop-shadow-xl shadow-lg"
                >
                  <div className=" w-[38%]">
                    <img
                      src={item?.img}
                      alt="news"
                      className="w-[230px] h-[130px] object-fit"
                    />
                  </div>
                  <div className="w-[62%] flex flex-col gap-2">
                    <span className=" flex gap-2 text-xs">
                      <p>{item?.createdBy?.name || "Anonymous"}</p>
                      <p className=" font-extrabold">|</p>
                      {convertDate(item.date || "NA")}
                    </span>
                    <h1 className="text-lg font-bold text-custom-150">
                      {item.title.slice(0, 50)} ...
                    </h1>
                    <p className="text-sm text-customtext-100">
                      {item.description.slice(0, 100)} ...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Appear>
        )}

        <div className=" w-full flex items-start justify-start gap-2 flex-col mt-10">
          <div className=" w-full flex items-center justify-between pr-3">
            <h1 className=" font-bold text-xl text-gray-600 w-full pl-4">
              General News
            </h1>
            <div className="flex items-center flex-col lg:flex-row lg:justify-center gap-5 w-full md:w-auto">
              <div className=" flex items-center justify-center gap-2">
                <input
                  type="date"
                  className=" border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 outline-none"
                  onChange={(e) => setFrom(e.target.value)}
                  value={from}
                />
                <p>to</p>
                <input
                  type="date"
                  className=" border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 outline-none"
                  onChange={(e) => setTo(e.target.value)}
                  value={to}
                />
              </div>
              <Button
                variant="outline"
                className=" border-red-500 hover:text-red-500"
                onClick={() => {
                  setFrom("");
                  setTo("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
          {allNews?.loading ? (
            <div className="flex gap-3 items-center justify-between mt-10 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[310px] w-[23%]" />
              ))}
            </div>
          ) : allNews && allNews?.news?.length > 0 ? (
            <div className="lg:grid lg:grid-cols-4 grid-cols-1 gap-5 w-full h-full px-4 py-2">
              {allNews?.news?.map((item) => (
                <NewsCard item={item} type="vertical" />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-xl font-bold text-gray-500">
              No news found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
