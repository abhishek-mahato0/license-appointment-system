"use client";
import React, { useState } from "react";
import Banner from "../_components/Banner";
import FullFlex from "@/components/common/Fullflex";
import { useForm } from "react-hook-form";
import Links from "@/components/common/Links";
import { Eye, EyeOff } from "lucide-react";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showpassword, setShowpassword] = useState<boolean>(false);

  return (
    <div className="flex w-screen h-screen">
      <div className=" w-[40%]">
        <Banner />
      </div>
      <FullFlex className="w-[60%] flex-col bg-[#e3f2ff]">
        <h1 className=" text-2xl font-semibold pb-4">Login</h1>
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
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
                {...register("password", {
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

            {errors?.password && (
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
            <input
              type="submit"
              className="bg-custom-100 px-3 py-2 text-white rounded-[10px] w-full cursor-pointer hover:scale-105"
            />
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
