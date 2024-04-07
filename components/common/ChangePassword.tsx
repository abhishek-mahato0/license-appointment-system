"use client";
import React, { useState } from "react";
import { PopupModal } from "./PopupModal";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import LoaderButton from "./LoaderButton";
import { apiinstance } from "@/services/Api";
import { useToast } from "../ui/use-toast";
import { signOut } from "next-auth/react";

export default function ChangePassword({
  triggerChildren,
}: {
  triggerChildren: any;
}) {
  const params = useSearchParams().get("type");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleChangePassword() {
    try {
      setLoading(true);
      const payload = {
        oldPassword,
        newPassword,
      };
      const res = await apiinstance.patch("user/verify/change", payload);
      if (res.status == 200) {
        document.getElementById("close")?.click();
        await apiinstance.get("user/logout");
        await signOut();
        return toast({
          title: "Success",
          description: res?.data?.message,
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <PopupModal
      title="Change Password"
      triggerChildren={triggerChildren}
      onClick={() => {}}
      btnclassNames=" mr-10"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2 w-full">
          <label>Old Password</label>
          <input
            type="password"
            required
            placeholder="Enter your old password"
            className=" border-b-2 border-b-custom-150 outline-none w-full py-[5px] px-3 bg-[#e3f2ff]"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>New Password</label>
          <input
            type="password"
            required
            placeholder="Enter your new password"
            className=" border-b-2 border-b-custom-150 outline-none w-full py-[5px] px-3 bg-[#e3f2ff]"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <div className=" absolute bottom-6 right-3">
          <LoaderButton
            type="submit"
            onClick={handleChangePassword}
            loading={loading}
          >
            Submit
          </LoaderButton>
        </div>
      </div>
    </PopupModal>
  );
}
