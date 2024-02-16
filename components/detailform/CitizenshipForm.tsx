"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { citizenshipData, educationData } from "./FormData";
import Outline from "../common/FormDetail/Outline";
import { ChevronRight, Cross, SwitchCamera, X } from "lucide-react";
import { Button } from "../ui/button";
import FullFlex from "../common/Fullflex";
import { useToast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { handleFormData } from "../common/FormDetail/HandleFormData";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { apiinstance } from "@/services/Api";
import { useSession } from "next-auth/react";
import { Updatelocalstorage } from "@/utils/Updatelocalstorage";

export default function CitizenshipForm() {
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasLicense, setHasLicense] = useState<boolean>(false);
  const [pictureFront, setPictureFront] = useState<any>(null);
  const [pictureBack, setPictureBack] = useState<any>(null);
  const [baseFront, setBaseFront] = useState<any>(null);
  const [baseBack, setBaseBack] = useState<any>(null);

  const onChangeFrontPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setPictureFront(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setBaseFront(fileReader.result as string);
      };
    }
  };
  const onChangeBackPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setPictureBack(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setBaseBack(fileReader.result as string);
      };
    }
  };
  const profileFrontref = useRef<any>(null);
  const profileBackref = useRef<any>(null);

  const { register, handleSubmit } = useForm();
  const handlePersonalData = async (data: any) => {
    try {
      if (!pictureFront || !pictureBack)
        return toast({
          title: "Form Error",
          description: "Please provide both front and back picture",
        });
      const payload = {
        ...data,
        front: baseFront,
        back: baseBack,
      };
      try {
        const res = await apiinstance.post(
          `/user/information/${session?.user?.id}/citizenship`,
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
        Updatelocalstorage({ citizenship_id: res.data._id });
        if (hasLicense) {
          return router.push("license/");
        } else {
          return router.push("summary/");
        }
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
    <div className=" flex flex-col w-full">
      <form
        className=" w-[100%] bg-custom-50 p-8 gap-8 flex flex-col"
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
            <FullFlex className="items-start border-[1px] border-custom-100 p-2 flex-col w-[49%]">
              <FullFlex className=" w-full items-center gap-2 justify-between mr-4">
                <div
                  onClick={() => profileFrontref.current?.click()}
                  className="flex items-center justify-start w-[60%]"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <SwitchCamera size={40} className="cursor-pointer" />
                    <p className=" disabled">
                      {pictureFront
                        ? pictureFront?.name.toString()
                        : "Upload Front Picture"}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="front"
                    className=" outline-none p-3 w-full bg-[#e3f2ff] hidden"
                    ref={profileFrontref}
                    onChange={onChangeFrontPicture}
                  />
                </div>
                <X
                  size={20}
                  className="cursor-pointer hover:scale-105"
                  onClick={() => setPictureFront(null)}
                />
              </FullFlex>
              <FullFlex className=" w-full">
                {pictureFront && (
                  <img
                    src={URL?.createObjectURL(pictureFront)}
                    alt="profile"
                    className="w-full h-[240px] object-cover"
                  />
                )}
              </FullFlex>
            </FullFlex>
            <FullFlex className="items-start border-[1px] border-custom-100 p-2 flex-col w-[49%]">
              <FullFlex className=" w-full items-center justify-between mr-4">
                <div
                  onClick={() => profileBackref?.current?.click()}
                  className="flex items-center justify-start w-[60%]"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <SwitchCamera size={40} className="cursor-pointer" />
                    <p className=" disabled">
                      {pictureBack
                        ? pictureBack?.name.toString()
                        : "Upload Back Picture"}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="back"
                    className=" outline-none p-3 w-full bg-[#e3f2ff] hidden"
                    ref={profileBackref}
                    onChange={onChangeBackPicture}
                  />
                </div>
                <X
                  size={20}
                  className="cursor-pointer hover:scale-105"
                  onClick={() => setPictureBack(null)}
                />
              </FullFlex>
              <FullFlex className=" w-full">
                {pictureBack && (
                  <img
                    src={URL?.createObjectURL(pictureBack)}
                    alt="profile"
                    className="w-full h-[240px] object-cover"
                  />
                )}
              </FullFlex>
            </FullFlex>
          </div>
        </Outline>
        <div className=" flex items-center justify-start w-full gap-2">
          <Checkbox
            id="terms"
            onClick={() => setHasLicense(!hasLicense)}
            checked={hasLicense}
          />
          <label htmlFor="terms">Do you have a driving license?</label>
        </div>
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
  );
}
