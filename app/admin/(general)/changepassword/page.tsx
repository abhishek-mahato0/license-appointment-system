"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const { toast } = useToast();
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const res = await apiinstance.patch("admin/login/verify/change", data);
      if (res.status === 200) {
        toast({
          title: "Success",
          description: res?.data?.message,
          variant: "success",
        });
        return router.push("/admin/login");
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message,
      });
    }
  };
  return (
    <div className=" w-full flex items-center justify-center h-screen backdrop-blur-sm">
      <div className=" w-[450px] flex flex-col px-4 py-3 backdrop-blur-lg bg-custom-50 gap-2 shadow-lg">
        <h1 className=" text-xl font-bold pl-3">Change Password</h1>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-4 p-4"
        >
          <div className=" flex flex-col gap-1 w-full">
            <label>Old Password</label>
            <div className="flex items-center justify-center">
              <input
                type={show ? "text" : "password"}
                placeholder="Old Password"
                {...register("oldPassword", { required: true })}
                className=" border-2 border-custom-100 p-2 rounded-md focus:outline-none focus:border-custom-150 transition-all duration-300 ease-in-out w-full"
              />
              {show ? (
                <EyeOff
                  className="absolute right-10 cursor-pointer hover:scale-105"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <Eye
                  className="absolute right-10 cursor-pointer hover:scale-105"
                  onClick={() => setShow(!show)}
                />
              )}
            </div>

            {errors.oldPassword && (
              <span className=" text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className=" flex flex-col gap-1 w-full">
            <label>New Password</label>
            <div className="flex items-center justify-center">
              <input
                type={show ? "text" : "password"}
                placeholder="New Password"
                {...register("newPassword", { required: true })}
                className=" border-2 border-custom-100 p-2 rounded-md focus:outline-none focus:border-custom-150 transition-all duration-300 ease-in-out w-full"
              />
              {show ? (
                <EyeOff
                  className="absolute right-10 cursor-pointer hover:scale-105"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <Eye
                  className="absolute right-10 cursor-pointer hover:scale-105"
                  onClick={() => setShow(!show)}
                />
              )}
            </div>

            {errors.oldPassword && (
              <span className=" text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>
          <Button type="submit" className=" bg-custom-100 text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
