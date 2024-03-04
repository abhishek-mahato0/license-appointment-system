"use client";
import React, { useState } from "react";
import Banner from "../_components/Banner";
import FullFlex from "@/components/common/Fullflex";
import { useForm } from "react-hook-form";
import Links from "@/components/common/Links";
import { Eye, EyeOff, UserCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import Loader from "@/components/common/Loader";
import { redirect } from "next/navigation";

export default function page() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const profileref = React.useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const onPictureUpload = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      setProfile(fileReader.result as string);
    };
  };
  const registerUser = async (datas: any) => {
    setLoading(true);
    try {
      if (!profile) {
        return toast({
          title: "Error",
          description: "Please upload a profile picture.",
        });
      }
      if (datas?.password !== datas?.cpassword) {
        return toast({
          title: "Error",
          description: "Password and confirm password should match.",
        });
      }
      const payload = { ...datas, avatar: profile };
      const { data } = await apiinstance.post("user/register", payload);
      if (data) {
        toast({
          title: "Success",
          description: data?.message,
          variant: "success",
        });
        return redirect("/login");
      }
      return toast({
        title: "Error",
        description: data?.message,
        variant: "destructive",
      });
    } catch (error: any) {
      setLoading(false);
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className=" w-[40%]">
        <Banner />
      </div>
      <FullFlex className="w-[60%] flex-col bg-[#e3f2ff] h-full">
        <h1 className=" text-2xl font-semibold pb-4 pt-4">Register</h1>
        <form
          onSubmit={handleSubmit((datas) => registerUser(datas))}
          className=" flex flex-col gap-5 w-[70%]"
          encType="multipart/form-data"
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
            {errors?.name && (
              <p className=" text-xs text-red-600">
                {errors.email?.type === "required" && "Please provide name"}
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
            <label>Phone</label>
            <input
              {...register("phone", {
                required: true,
              })}
              type="tel"
              placeholder="Phone Number"
              className=" border-b-2 border-b-custom-100 outline-none w-full p-3 bg-[#e3f2ff]"
            />
            {errors?.phone && (
              <p className=" text-xs text-red-600">
                {errors.phone?.type === "required"
                  ? "Please provide phone number"
                  : "Phone number should be 10 digits"}
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
          <FullFlex className="flex-col items-start">
            <div onClick={() => profileref.current?.click()}>
              <UserCircle size={40} className="cursor-pointer" />
            </div>
            <input
              type="file"
              name="front"
              className=" outline-none p-3 w-full bg-[#e3f2ff] hidden"
              ref={profileref}
              onChange={onPictureUpload}
            />
          </FullFlex>
          {/* <FullFlex className="w-full justify-end">
            <Links
              href="/forgot"
              name="Forgot Password?"
              className=" text-custom-100 text-[13px] hover:underline"
            ></Links>
          </FullFlex> */}

          <FullFlex
            className="w-full
          "
          >
            {!loading ? (
              <input
                type="submit"
                className="bg-custom-100 px-3 py-2 text-white rounded-[10px] w-full cursor-pointer hover:scale-105"
              />
            ) : (
              <Loader />
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
