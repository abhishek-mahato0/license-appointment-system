"use client";
import Links from "@/components/common/Links";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  // if (!searchParams?.pidx) return redirect("/apply/payment");
  // const [success, setSuccess] = useState(false);
  // const { toast } = useToast();
  // async function checkPaymentStatus() {
  //   try {
  //     const { data } = await apiinstance.post(
  //       "https://a.khalti.com/api/v2//epayment/lookup/",
  //       {
  //         pidx: searchParams?.pidx,
  //       }
  //     );
  //     if (data?.status === "Completed") {
  //       makePayment();
  //     } else {
  //       toast({
  //         title: "Payment Failed",
  //         description: "Your payment has been failed. Please try again.",
  //         variant: "destructive",
  //       });
  //       return redirect("/apply/payment");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Payment Failed",
  //       description: "Your payment has been failed. Please try again.",
  //       variant: "destructive",
  //     });
  //     return redirect("/apply/payment");
  //   }
  // }

  // async function makePayment() {
  //   try {
  //     const res = await apiinstance.post("user/payment", {
  //       app_id: searchParams?.purchase_order_id,
  //       user_id: searchParams?.purchase_order_name,
  //       pidx: searchParams?.pidx,
  //     });
  //     if (res.status === 200) {
  //       setSuccess(true);
  //       toast({
  //         title: "Payment Successfull",
  //         description: "Your payment of 1000 has been recieved.",
  //         variant: "success",
  //       });
  //       return redirect("/appointments");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Payment Failed",
  //       description: "Your payment has been failed. Please try again.",
  //       variant: "destructive",
  //     });
  //     return redirect("/apply/payment");
  //   }
  // }
  // useEffect(() => {
  //   searchParams?.pidx && checkPaymentStatus();
  // }, [searchParams]);
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className=" shadow-lg bg-slate-300 w-[400px] h-[200px] flex flex-col justify-center items-center gap-5">
        {/* {!success &&  */}
        <Loader />
      </div>
    </div>
  );
}
