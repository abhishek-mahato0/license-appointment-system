"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data: session } = useSession();
  const app_id = searchParams?.app_id;
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  let payload = {
    return_url: `http://localhost:3000/apply/payment/verify/`,
    website_url: "http://localhost:3000/",
    amount: 1000,
    purchase_order_id: app_id,
    purchase_order_name: session?.user?.id,
    customer_info: {
      name: "License Application",
      email: "example@gmail.com",
      phone: "9800000123",
    },
  };

  function cashPayment() {
    toast({
      title: "Cash On Payment",
      description: "You have to pay Rs 1000 cash to the office",
      variant: "success",
    });
    router.push("/dashboard");
  }
  async function makePyament() {
    setLoading(true);
    try {
      const { data } = await apiinstance.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        payload,
        {
          headers: {
            Authorization: "key a558b8820fa84abca6fd20cf6c51a0f0",
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        if (data?.payment_url) {
          router.push(data?.payment_url);
        } else {
          toast({
            title: "Payment Failed",
            description: "Your payment has been failed. Please try again.",
          });
        }
      }
    } catch (error) {
      return toast({
        title: "Payment Failed",
        description: "Your payment has been failed",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" w-full flex flex-col items-start justify-center">
      <div className=" w-[70%] flex flex-col p-4 bg-custom-50 text-customtext-100">
        <div className=" w-full pl-10">
          <h2 className=" font-bold">Choose a Payment Method</h2>
          <div className=" w-full flex items-center justify-between mt-2 gap-[50px]">
            <Button
              onClick={() => {
                makePyament();
              }}
              className=" w-1/2 "
              variant="khalti"
            >
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
