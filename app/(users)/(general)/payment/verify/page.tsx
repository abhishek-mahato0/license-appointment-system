"use client";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const pidx = useSearchParams()?.get("pidx");
  const purchase_order_id = useSearchParams()?.get("purchase_order_id");
  const purchase_order_name = useSearchParams()?.get("purchase_order_name");
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  async function makePayment() {
    try {
      console.log(pidx, purchase_order_id, purchase_order_name);
      const res = await apiinstance.post(`user/payment`, {
        app_id: purchase_order_id,
        user_id: purchase_order_name,
        pidx: pidx,
      });
      if (res.status === 200) {
        console.log(res);
        setSuccess(true);
        toast({
          title: "Payment Successfull",
          description: "Your payment of 1000 has been recieved.",
          variant: "success",
        });
        return router.push("/appointments");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Payment Failed",
        description: "Your payment has been failed. Please try again.",
        variant: "destructive",
      });
      return router.push("/appointments");
    }
  }
  useEffect(() => {
    if (!pidx) return router.push("/appointments");
    pidx && makePayment();
  }, [pidx]);
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className=" shadow-lg bg-slate-300 w-[400px] h-[200px] flex flex-col justify-center items-center gap-5">
        <p className=" font-bold text-xl text-custom-150">
          Verifying payment......
        </p>
        {!success && <Loader />}
      </div>
    </div>
  );
}
