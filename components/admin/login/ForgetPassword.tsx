"use client";
import OTPModal from "@/components/common/OTPModal";
import { PopupModal } from "@/components/common/PopupModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgetPassword({
  triggerChildren,
}: {
  triggerChildren: any;
}) {
  const { register, handleSubmit } = useForm();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const params = useSearchParams().get("type");
  const router = useRouter();
  const { toast } = useToast();
  const pemail = useSearchParams().get("email");
  const potp = useSearchParams().get("otp");

  async function handleForgetPassword() {
    if (!email) {
      return toast({
        title: "Error",
        description: "Email is required",
      });
    }
    try {
      const res = await apiinstance.patch("admin/login/verify/forget", {
        email: email,
      });
      if (res.status == 200) {
        router.push(`?type=otp&email=${email}`);
        return toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    }
  }

  async function handleOTPMatch() {
    try {
      if (!pemail || !otp) {
        return toast({
          title: "Error",
          description: "Otp is required",
        });
      }
      const res = await apiinstance.get(
        `admin/login/verify/otp?email=${pemail}&otp=${otp}`
      );
      if (res.status == 200) {
        router.push(`?type=new&email=${pemail}&otp=${otp}`);
        return toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    }
  }

  async function handleNewPassword(data: any) {
    try {
      if (!data.password || !pemail || !potp) {
        return toast({
          title: "Error",
          description: "Email, otp and password is required",
        });
      }
      const res = await apiinstance.patch(
        `admin/login/verify/new?email=${pemail}&otp=${potp}`,
        { password: data.password }
      );
      if (res.status == 200) {
        document.getElementById("close")?.click();
        router.push("/admin/login");
        return toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    }
  }
  return (
    <PopupModal
      title="Forget Password"
      triggerChildren={triggerChildren}
      onClick={() => {}}
      btnclassNames=" mr-10"
    >
      <div className={`${params === "forget" ? "flex" : "hidden"} w-full`}>
        <div className="flex flex-col gap-3 w-full">
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className=" border-2 border-custom-100 outline-none w-full py-[5px] px-3 rounded-[7px] bg-[#e3f2ff]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" absolute bottom-6 right-3">
          <Button
            type="submit"
            variant="default"
            onClick={handleForgetPassword}
          >
            Submit
          </Button>
        </div>
      </div>
      <div
        className={` ${
          params === "otp" ? "flex" : "w-0 h-0 hidden"
        } w-full flex-col items-start justify-center gap-4 mb-3 `}
      >
        <p>Enter OTP sent to your email.</p>
        <OTPModal otp={otp} setOtp={setOtp} />
        <Button className=" absolute bottom-6 right-4" onClick={handleOTPMatch}>
          Submit
        </Button>
      </div>
      <div
        className={` ${
          params === "new" ? "flex" : "w-0 h-0 hidden"
        } w-full flex-col items-start justify-center gap-4 mb-3 `}
      >
        <form
          onSubmit={handleSubmit((data) => {
            handleNewPassword(data);
          })}
          className=" flex w-full"
        >
          <div className="flex flex-col gap-3 w-full">
            <label>New Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your new password"
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
    </PopupModal>
  );
}
