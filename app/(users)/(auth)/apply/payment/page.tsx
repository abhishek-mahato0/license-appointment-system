"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const { toast } = useToast();
  const router = useRouter();
  async function khaltiPayment() {}
  function cashPayment() {
    toast({
      title: "Cash On Payment",
      description: "You have to pay Rs 1000 cash to the office",
      variant: "success",
    });
    router.push("/dashboard");
  }
  return (
    <div className=" w-full flex flex-col items-start justify-center">
      <div className=" w-[70%] flex flex-col p-4 bg-custom-50 text-customtext-100">
        <div className=" w-full pl-10">
          <h2 className=" font-bold">Choose a Payment Method</h2>
          <div className=" w-full flex items-center justify-between mt-2 gap-[50px]">
            <Button onClick={() => {}} className=" w-1/2 " variant="khalti">
              <img
                src="/images/khaltis.svg"
                alt="Khalti"
                className=" w-10 h-10 bg-transparent"
              />
              Pay Rs 1000 using Khalti
            </Button>
            <Button onClick={cashPayment} className=" w-1/2 py-2">
              <img
                src="/images/cashs.svg"
                alt="Cash"
                className=" w-8 h-8 bg-transparent"
              />
              Pay Rs 1000 cash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
