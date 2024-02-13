import React, { use, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { personalData } from "@/components/detailform/FormData";
import { useForm } from "react-hook-form";
import { handleFormData } from "../FormDetail/HandleFormData";
import { apiinstance } from "@/services/Api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type TPersonalInformation = {
  personalInformation: any;
};

export default function PersonalEditForm({
  personalInformation,
}: TPersonalInformation) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: personalInformation,
  });
  const onSubmit = async (data: any) => {
    if (!userInfo?.id) {
      toast({
        title: "Error",
        description: "PLease login to continue.",
      });
      return router.push("/login");
    }
    try {
      const payload = {
        first_name: data.firstName,
        middle_name: data.middlename,
        last_name: data.lastname,
        guardian_name: {
          name: data.guardiansname,
          relation: data.guardiansrelation,
        },
        DOB: data.dob,
        gender: data.gender,
        blood_group: data.bloodgroup,
        email: data.email,
        phone: data.phone,
      };
      const res = await apiinstance.put(
        `/user/information/${userInfo.id}/personal`,
        payload
      );
      if (res.status === 200) {
        return toast({ title: "Success", description: res.data.message });
      }
      return toast({ title: "Error", description: res.data.message });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data.message || "Error Occured",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="w-6 h-6 text-custom-150 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className=" min-w-fit">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
          <DialogDescription>
            This is the personal information edit form.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col space-x-2">
          <form
            className="grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {personalData?.map((item: any) => {
              return (
                <div
                  className=" flex flex-col gap-1 items-start justify-start"
                  key={item.value}
                >
                  {handleFormData(item, register)}
                </div>
              );
            })}
            <div className="flex items-center justify-end w-full absolute right-4 bottom-4">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
