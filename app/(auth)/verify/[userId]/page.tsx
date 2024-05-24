"use client";
import Links from "@/components/common/Links";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { userId: string } }) {
  const { toast } = useToast();
  const token = useSearchParams()?.get("token");
  const [success, setSuccess] = useState(false);
  async function verifyUser() {
    try {
      const res = await apiinstance.get(
        `/user/verify/${params.userId}?token=${token}`
      );
      if (res?.status === 200) {
        setSuccess(true);
        return toast({
          title: res.data.message,
          variant: "success",
        });
      }
    } catch (error: any) {
      toast({
        title: "Invalid Token",
        description: error?.response.data.error,
        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    token && verifyUser();
  }, [params.userId]);
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      {success ? (
        <div className="flex flex-col px-5 py-3 bg-white shadow-lg justify-center items-center gap-5">
          <h1 className="text-black font-bold text-xl">
            Email Verified Successfully.
          </h1>
          <Links
            name="Go to Login"
            href="/login"
            rightChildren={true}
            className="bg-custom-100 text-white hover:scale-105"
          >
            <ArrowRight size={15} />
          </Links>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
