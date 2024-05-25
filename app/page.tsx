"use client";
import { convertDate } from "@/utils/convertDate";
import Navbar from "../components/common/Navbar";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { fetchNews } from "@/redux/slices/newsSlice";
import NewsCard from "@/components/common/NewsCard";
import Loader from "@/components/common/dashboard/Loader";
import HeaderTitle from "@/components/common/HeaderTitle";
import SmallNav from "@/components/common/SmallNavbar";
import Appear from "@/components/FramerMotion/Appear";

export default function Home() {
  const dispatch = useAppDispatch();
  const { loading, newsList, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (newsList) return;
    dispatch(fetchNews());
  }, []);
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
                  className=" flex w-full items-start justify-center gap-3 py-1 hover:scale-105 duration-75 drop-shadow-xl shadow-lg"
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
                      {item.title}
                    </h1>
                    <p className="text-sm text-customtext-100">
                      {item.description.slice(0, 100)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Appear>
        )}

        {newsList && newsList?.general?.length > 0 && (
          <div className=" w-full flex items-start justify-start gap-2 flex-col mt-8">
            <h1 className=" font-bold text-xl text-gray-600 w-full pl-4">
              General News
            </h1>
            <div className="lg:grid lg:grid-cols-4 grid-cols-1 gap-5 w-full h-full px-4 py-2">
              {newsList?.general?.map((item) => (
                <NewsCard item={item} type="vertical" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
