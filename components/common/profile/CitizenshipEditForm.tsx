"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronRight, Cross, Edit, SwitchCamera, X } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { apiinstance } from "@/services/Api";
import { useToast } from "@/components/ui/use-toast";
import Outline from "../FormDetail/Outline";
import { citizenshipData } from "@/components/detailform/FormData";
import { handleFormData } from "../FormDetail/HandleFormData";
import FullFlex from "../Fullflex";
import { Button } from "@/components/ui/button";

export default function CitizenshipEditForm({ citizenshipInformation }: any) {
  const closeref = useRef<any>(null);
  const { toast } = useToast();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: citizenshipInformation,
  });
  const handlePersonalData = async (data: any) => {
    try {
      const payload = {
        ...data,
        front: citizenshipInformation.front,
        back: citizenshipInformation.back,
      };
      if (!userInfo?.id) {
        toast({
          title: "Error",
          description: "PLease login to continue.",
        });
        return router.push("/login");
      }
      try {
        const res = await apiinstance.put(
          `/user/information/${userInfo?.id}/citizenship`,
          { citizenshipInformation: payload }
        );
        if (res.status != 200) {
          return toast({
            title: "Error",
            description: res.data.message,
          });
        }
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        closeref && closeref?.current?.click();
        return;
      } catch (error) {
        return toast({
          title: "Error",
          description: "Some error occured",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Some error occured",
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
          <DialogTitle>Edit Citizenship Information</DialogTitle>
          <DialogDescription>
            This is the citizenship information edit form.
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col w-full">
          <form
            className=" w-[100%] bg-custom-50 p-2 gap-7 flex flex-col"
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => handlePersonalData(data))}
          >
            <Outline title="Citizenship Information">
              <div className="grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2">
                {citizenshipData.map((item: any) => {
                  return (
                    <div className=" flex flex-col gap-1 items-start justify-start">
                      {handleFormData(item, register)}
                    </div>
                  );
                })}
              </div>
            </Outline>
            <Outline title="Citizenship Picture">
              <div className="flex justify-between items-start w-full gap-2 ">
                <FullFlex className=" w-full">
                  {citizenshipInformation.front && (
                    <img
                      src={citizenshipInformation.front}
                      alt="profile"
                      className="w-full h-[180px] object-cover"
                    />
                  )}
                </FullFlex>
                <FullFlex className=" w-full">
                  {citizenshipInformation.back && (
                    <img
                      src={citizenshipInformation.back}
                      alt="profile"
                      className="w-full h-[180px] object-cover"
                    />
                  )}
                </FullFlex>
              </div>
            </Outline>
            <div className=" flex items-center justify-end w-full">
              <Button className=" rounded-sm" type="submit">
                Next
                <p>
                  <ChevronRight width={17} />
                </p>
              </Button>
            </div>
          </form>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <button type="button" className="hidden" ref={closeref}>
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
