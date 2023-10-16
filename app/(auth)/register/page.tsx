"use client";
import React, { useState } from "react";
import Banner from "../_components/Banner";
import FullFlex from "@/components/common/Fullflex";
import { FieldValue, useForm } from "react-hook-form";
import Links from "@/components/common/Links";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function page() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const registerUser = async (datas: any) => {
    try {
      if (datas?.password !== datas?.cpassword) {
        return toast({
          title: "Error",
          description: "Password and confirm password should match.",
        });
      }
      const formdata = new FormData();
      if (datas) {
        formdata.append("name", datas.name);
        formdata.append("email", datas.email);
        formdata.append("password", datas.password);
        //formdata.append("avatar", datas.avatar);
      }
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        formdata
      );
      console.log(res);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
      });
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className=" w-[40%]">
        <Banner />
      </div>
      <FullFlex className="w-[60%] flex-col bg-[#e3f2ff]">
        <h1 className=" text-2xl font-semibold pb-4">Register</h1>
        <form
          onSubmit={handleSubmit((datas) => registerUser(datas))}
          className=" flex flex-col gap-5 w-[70%]"
        >
          <FullFlex className="flex-col items-start">
            <label>Full Name</label>
            <input
              {...register("name", {
                min: 10,
                required: true,
              })}
              type="text"
              placeholder="Full Name"
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
          <FullFlex className="flex-col items-start">
            <label>Confirm Password</label>
            <div className="flex justify-between items-center w-full border-b-2 border-b-custom-100 py-0">
              <input
                {...register("cpassword", {
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

            {errors?.cpassword && (
              <p className=" text-xs text-red-600">
                Password and Confirm password should match
              </p>
            )}
          </FullFlex>
          <FullFlex className="w-full justify-end">
            <Links
              href="/forgot"
              name="Forgot Password?"
              className=" text-custom-100 text-[13px] hover:underline"
            ></Links>
          </FullFlex>
          <FullFlex className=" flex-col justify-start">
            <input
              {...register("avatar", {
                required: true,
                validate: {
                  maxSize: (value) => {
                    if (value[0].size > 1048576) {
                      return "File size must be less than 1MB";
                    }
                    return true;
                  },
                  allowedTypes: (value) => {
                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                    ]; // Define your allowed file types
                    if (!allowedTypes.includes(value[0].type)) {
                      return "File type not allowed";
                    }
                    return true;
                  },
                },
              })}
              type="file"
              className="w-full"
            />
            {errors?.avatar && (
              <p className=" text-xs text-red-600 w-full">
                {errors.avatar?.type === "required"
                  ? "Please attach an avatar"
                  : errors?.avatar?.message?.toString()}
              </p>
            )}
          </FullFlex>
          <FullFlex
            className="w-full
          "
          >
            {!isLoading ? (
              <input
                type="submit"
                className="bg-custom-100 px-3 py-2 text-white rounded-[10px] w-full cursor-pointer hover:scale-105"
              />
            ) : (
              <p>Loading</p>
            )}
          </FullFlex>
          <Links
            name="Already Registered?"
            href="/login"
            className=" hover:underline"
          ></Links>
        </form>
      </FullFlex>
    </div>
  );
}
