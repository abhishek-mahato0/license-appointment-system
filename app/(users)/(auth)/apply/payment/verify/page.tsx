"use client";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams?.pidx) return redirect("/apply/payment");
  const { toast } = useToast();
  async function checkPaymentStatus() {
    try {
      const { data } = await apiinstance.post(
        "https://a.khalti.com/api/v2//epayment/lookup/",
        {
          pidx: searchParams?.pidx,
        }
      );
      if (data?.status === "Completed") {
        toast({
          title: "Payment Success",
          description: "Your payment has been successfull.",
          variant: "success",
        });
        return redirect("/appointments");
      } else {
        toast({
          title: "Payment Failed",
          description: "Your payment has been failed. Please try again.",
          variant: "destructive",
        });
        return redirect("/apply/payment");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Your payment has been failed. Please try again.",
        variant: "destructive",
      });
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
        return redirect("/appointments");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Your payment has been failed. Please try again.",
        variant: "destructive",
      });
      return redirect("/apply/payment");
    }
  }
  useEffect(() => {}, [searchParams]);
  console.log("page", searchParams, params);
  return (
    <div className=" w-full flex items-center justify-center">
      <div className="w-[200px] h-[200px]">
        <h1 className="text-xl font-bold">Verifying Payment</h1>
      </div>
    </div>
  );
}
