"use client";
import React, { useState } from "react";
import { PopupModal } from "./PopupModal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import OTPModal from "./OTPModal";
import { useRouter, useSearchParams } from "next/navigation";

export default function ForgetPassword({
  triggerChildren,
  onSubmit,
}: {
  type?: string;
  triggerChildren: any;
  onSubmit: (data: any) => void;
}) {
  const { register, handleSubmit } = useForm();
  const [otp, setOtp] = useState("");
  const params = useSearchParams().get("type");
  const router = useRouter();
  return (
    <PopupModal
      title="Forget Password"
      triggerChildren={triggerChildren}
      onClick={() => {}}
      btnclassNames=" mr-10"
    >
      <div className={`${params === "forget" ? "flex" : "hidden"} w-full`}>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            router.push("?type=otp");
          })}
          className=" flex w-full"
        >
          <div className="flex flex-col gap-3 w-full">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className=" border-2 border-custom-100 outline-none w-full py-[5px] px-3 rounded-[7px] bg-[#e3f2ff]"
            />
          </div>
          <div className=" absolute bottom-6 right-3">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div
        className={` ${
          params === "otp" ? "flex" : "w-0 h-0 hidden"
        } w-full flex-col items-start justify-center gap-4 mb-3 `}
      >
        <p>Enter OTP sent to your email.</p>
        <OTPModal otp={otp} setOtp={setOtp} />
        <Button className=" absolute bottom-6 right-4">Submit</Button>
      </div>
    </PopupModal>
  );
}
