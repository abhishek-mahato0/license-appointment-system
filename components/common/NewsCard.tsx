import { INews } from "@/redux/slices/newsSlice";
import { convertDate } from "@/utils/convertDate";
import Link from "next/link";
import React from "react";

export default function NewsCard({
  item,
  type,
}: {
  item: INews;
  type: string;
}) {
  return (
    <Link
      href={`/news/${item._id}`}
      key={item._id}
      className={`flex ${
        type === "vertical" ? "flex-col" : ""
      } w-full items-start justify-center bg-gray-50 shadow-md hover:scale-105 duration-75 pb-5`}
    >
      <div className={`${type === "vertical" ? "w-full" : "w-[38%]"}`}>
        <img
          src={item?.img}
          alt="news"
          className="w-full h-[180px] object-fit"
        />
      </div>
      <div
        className={`${
          type === "vertical" ? " w-full" : "w-[62%]"
        } flex flex-col gap-2 px-2 mt-2`}
      >
        <span className=" flex gap-2 text-xs">
          <p>{item?.createdBy?.name || "Anonymous"}</p>
          <p className=" font-extrabold">|</p>
          {convertDate(item.date || "NA")}
        </span>
        <h1 className="text-lg font-bold text-custom-150">{item.title}</h1>
        <p className="text-sm text-customtext-100">
          {item.description.slice(0, 100)}
        </p>
      </div>
    </Link>
  );
}
