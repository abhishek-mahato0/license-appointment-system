"use client";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = React.useState<any>({});
  if (!params?.id) return router.push("/");
  async function fetchANew() {
    try {
      const res = await apiinstance.get(`/admin/news/${params.id}`);
      if (res.status === 200) {
        return setNews(res.data);
      }
    } catch (error: any) {
      return router.push("/");
    }
  }
  useEffect(() => {
    fetchANew();
  }, [params?.id]);

  return (
    <div className=" w-full flex flex-col px-4 gap-2">
      <div className="w-full flex justify-between items-center px-4 py-5 text-2xl font-bold text-custom-150">
        {news?.title}
      </div>
      <div className=" w-full">
        <img
          src={news?.img}
          alt="news"
          className=" lg:h-[500px] h-[300px] w-full"
        />
      </div>
      <div className=" flex items-center justify-start text-xs font-normal mb-1">
        <span className=" flex gap-2">
          <p>{news?.createdBy?.name}</p>
          <p className=" font-extrabold">|</p>
          {news?.date}
        </span>
      </div>
      <div className="w-full flex justify-between items-center text-customtext-100 text-lg">
        {news?.description}
      </div>
    </div>
  );
}
