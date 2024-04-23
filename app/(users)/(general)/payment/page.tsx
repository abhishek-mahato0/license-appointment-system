"use client";
import LoaderButton from "@/components/common/LoaderButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { setPendingAppointment } from "@/redux/slices/appointmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { apiinstance } from "@/services/Api";
import { convertDate } from "@/utils/convertDate";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data: session } = useSession();
  const app_id = searchParams?.app_id;
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { pendingAppointment } = useAppSelector((state) => state.appointments);
  const [paymentUrl, setPaymentUrl] = useState("");
  const dispatch = useAppDispatch();

  async function getAppointment() {
    try {
      const res = await apiinstance.get(`/admin/appointments/${app_id}`);
      if (res.status === 200) {
        if (res?.data?.payment?.status === "completed") {
          return router.push("/appointments");
        }
        return dispatch(setPendingAppointment(res?.data));
      }
    } catch (error: any) {
      return router.push("/appointments");
    }
  }
  async function makePyament() {
    setLoading(true);
    try {
      const res = await apiinstance.get(`payment?app_id=${app_id}`);
      if (res.status === 200) {
        router.push(res?.data?.payment_url);
        return setPaymentUrl(res.data?.payment_url);
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
  function cashPayment() {
    toast({
      title: "Cash On Payment",
      description: "You have to pay Rs 1000 cash to the office",
      variant: "success",
    });
    router.push("/appointments");
  }
  useEffect(() => {
    if (!app_id) return router.push("/dashboard");
    getAppointment();
  }, []);

  // useEffect(() => {
  //   if (!paymentUrl) return;
  //   console.log(paymentUrl);
  //   document.getElementById("paymentClick")?.click();
  // }, [paymentUrl]);

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center">
      <div className=" w-full md:w-[80%] flex flex-col p-1 md:px-4 py-8 bg-custom-50 text-gray-600 mt-[5%]">
        {pendingAppointment?._id ? (
          <div className=" w-full md:pl-10 p-1">
            <h1 className=" font-bold text-2xl">
              Choose a Payment Method for your appointment
            </h1>
            <a
              href={paymentUrl}
              target="_blank"
              id="paymentClick"
              className=" hidden"
            >
              Payment
            </a>

            <div className=" w-full flex flex-col gap-2">
              <p className=" font-semibold text-xl my-2 text-custom-150">
                Appointment Info
              </p>
              <p>
                <strong>Tracking Id :</strong>
                {pendingAppointment?.tracking_id}
              </p>
              <p>
                <strong>Category :</strong>
                {pendingAppointment?.category}
              </p>
              <p>
                <strong>Book Date: </strong>
                {convertDate(pendingAppointment?.bookDate)}
              </p>
            </div>

            <div className=" w-full flex md:flex-row flex-col items-center justify-between mt-4 gap-[50px]">
              {loading ? (
                <LoaderButton loading={true}>Loading</LoaderButton>
              ) : (
                <Button
                  onClick={() => {
                    makePyament();
                  }}
                  className=" md:w-1/2 w-full "
                  variant="khalti"
                >
                  <img
                    src="/images/khaltis.svg"
                    alt="Khalti"
                    className=" w-10 h-10 bg-transparent"
                  />
                  Pay Rs 1000 using Khalti
                </Button>
              )}
              <Button onClick={cashPayment} className=" md:w-1/2 w-full py-2">
                <img
                  src="/images/cashs.svg"
                  alt="Cash"
                  className=" w-8 h-8 bg-transparent"
                />
                Pay Rs 1000 cash
              </Button>
            </div>
          </div>
        ) : (
          <div className=" w-full flex flex-col items-start justify-start pl-4 gap-3">
            <Skeleton className=" w-[70%] h-14" />
            <Skeleton className=" w-[50%] h-12" />
            <Skeleton className=" w-[50%] h-10" />
            <Skeleton className=" w-[40%] h-10" />
            <Skeleton className=" w-[50%] h-10" />
            <div className="w-full flex gap-4">
              <Skeleton className=" w-1/2 h-10" />
              <Skeleton className=" w-1/2 h-10" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
