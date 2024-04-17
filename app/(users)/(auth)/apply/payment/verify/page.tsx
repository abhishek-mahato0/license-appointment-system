"use client";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams?.pidx) return redirect("/apply/payment");
  const { data: session, update } = useSession();
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  async function checkPaymentStatus() {
    try {
      const { data } = await apiinstance.post(
        "https://a.khalti.com/api/v2/epayment/lookup/",
        {
          pidx: searchParams?.pidx,
        },
        {
          headers: {
            Authorization: "key a558b8820fa84abca6fd20cf6c51a0f0",
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.status === "Completed") {
        makePayment();
      } else {
        toast({
          title: "Payment Failed",
          description: "Your payment has been failed. Please try again.",
          variant: "destructive",
        });
        return redirect("/appointments");
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: "Your payment has been failed. Please try again.",
        variant: "destructive",
      });
      console.log("error", error);
      return redirect("/apply/payment");
    }
  }

  async function makePayment() {
    try {
      const res = await apiinstance.post("user/payment", {
        app_id: searchParams?.purchase_order_id,
        user_id: searchParams?.purchase_order_name,
        pidx: searchParams?.pidx,
      });
      if (res.status === 200) {
        setSuccess(true);
        toast({
          title: "Payment Successfull",
          description: "Your payment of 1000 has been recieved.",
          variant: "success",
        });
        update({
          hasApplied: true,
        });
        return redirect("/appointments");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Your payment has been failed. Please try again.",
        variant: "destructive",
      });
      return redirect("/apply/payment/");
    }
  }
  useEffect(() => {
    searchParams?.pidx && checkPaymentStatus();
  }, [searchParams]);
  console.log("page", searchParams, params);
  return (
    <div className=" w-[90%] h-[100%] flex justify-center items-center py-10">
      <div className=" shadow-lg bg-slate-300 w-[400px] h-[200px] flex flex-col justify-center items-center gap-5">
        <h1 className=" text-custom-150 text-xl font-bold">
          Verifying Payment
        </h1>
        {!success && <Loader />}
      </div>
    </div>
  );
}
