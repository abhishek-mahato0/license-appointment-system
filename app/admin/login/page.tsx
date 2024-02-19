"use client";
import Banner from "@/app/(auth)/_components/Banner";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import { adminLogin } from "@/utils/checkLogin";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async (data: any) => {
    setLoading(true);
    try {
      const { success, message, data } = await adminLogin();
      if (success) {
        toast({
          title: "Success",
          description: message,
        });
        await signIn("credentials", {
          id: data.user._id,
          email: data?.username,
          token: data?.token,
          role: data?.role,
          redirect: false,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: data.user._id,
            email: data?.username,
            token: data?.token,
            role: data?.role,
            redirect: false,
          })
        );
      }
      toast({
        title: "Error",
        description: data.message,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState<boolean>(false);
  return (
    <div className="flex w-screen h-screen">
      <div className=" w-[40%]">
        <Banner />
      </div>
      <FullFlex className="w-[60%] flex-col bg-[#e3f2ff]">
        <h1 className=" text-2xl font-semibold pb-4">Admin Login</h1>
        <form
          onSubmit={handleSubmit((data) => handleLogin(data))}
          className=" flex flex-col gap-5 w-[70%]"
        >
          <FullFlex className="flex-col items-start">
            <label>Email</label>
            <input
              {...register("email", {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                required: true,
              })}
              type="email"
              placeholder="name@gmail.com"
              className=" border-b-2 border-b-custom-100 outline-none w-full p-3 bg-[#e3f2ff]"
            />
            {errors?.email && (
              <p className=" text-xs text-red-600">
                {errors.email?.type === "required"
                  ? "Please provide email"
                  : "Email pattern does not match"}
              </p>
            )}
          </FullFlex>
          <FullFlex className="flex-col items-start">
            <label>Password</label>
            <div className="flex justify-between items-center w-full border-b-2 border-b-custom-100 py-0">
              <input
                {...register("pass", {
                  required: true,
                })}
                type={`${showpassword ? "text" : "password"}`}
                placeholder="*********"
                className=" outline-none p-3 w-full bg-[#e3f2ff]"
              />
              {showpassword ? (
                <Eye
                  color="black"
                  width={16}
                  size={17}
                  className=" cursor-pointer mr-4"
                  onClick={() => setShowpassword(false)}
                />
              ) : (
                <EyeOff
                  color="black"
                  width={16}
                  size={17}
                  className=" cursor-pointer mr-4"
                  onClick={() => setShowpassword(true)}
                />
              )}
            </div>

            {errors?.pass && (
              <p className=" text-xs text-red-600">Please provide password</p>
            )}
          </FullFlex>
          <FullFlex className="w-full justify-end">
            <Links
              href="/forgot"
              name="Forgot Password?"
              className=" text-custom-100 text-[13px] hover:underline"
            ></Links>
          </FullFlex>
          <FullFlex className="w-full">
            {loading ? (
              <div className="bg-custom-100 px-3 py-2 text-white rounded-[10px] w-full cursor-pointer hover:scale-105 flex items-center justify-center">
                <Loader
                  color="#ffffff"
                  height="20"
                  width="20"
                  radius="20"
                  type="spinner"
                />
              </div>
            ) : (
              <input
                type="submit"
                className="bg-custom-100 px-3 py-2 text-white rounded-[10px] w-full cursor-pointer hover:scale-105"
              />
            )}
          </FullFlex>
          <Links
            name="Not Registered Yet?"
            href="/register"
            className=" hover:underline"
          ></Links>
        </form>
      </FullFlex>
    </div>
  );
}
