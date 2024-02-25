"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { licenseCategoryData, licenseData } from "./FormData";
import Outline from "../common/FormDetail/Outline";
import { ChevronRight, SwitchCamera, X } from "lucide-react";
import { Button } from "../ui/button";
import FullFlex from "../common/Fullflex";
import { handleFormData } from "../common/FormDetail/HandleFormData";
import { useToast } from "../ui/use-toast";
import { useAppDispatch } from "@/redux/TypedHooks";
import { useRouter } from "next/navigation";
import { apiinstance } from "@/services/Api";
import { useSession } from "next-auth/react";
import { Updatelocalstorage } from "@/utils/Updatelocalstorage";
import Select from "react-select";
import { customStyles } from "../common/MultiselectStyles";

export default function LicenseForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [pictureFront, setPictureFront] = useState<any>(null);
  const [pictureBack, setPictureBack] = useState<any>(null);

  const onChangeFrontPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setPictureFront(fileReader.result as string);
      };
    }
  };
  const onChangeBackPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setPictureBack(fileReader.result as string);
      };
    }
  };
  const profileFrontref = useRef<any>(null);
  const profileBackref = useRef<any>(null);

  const { register, handleSubmit } = useForm();
  const handlePersonalData = async (data: any) => {
    if (!pictureFront || !pictureBack) {
      return toast({
        title: "Error",
        description: "Please upload both front and back picture.",
      });
    }
    const payload = {
      ...data,
      category: selectedCat?.map((item: any) => item.value),
      front: pictureFront,
      back: pictureBack,
    };
    try {
      const res = await apiinstance.post(
        `/user/information/${session?.user?.id}/license`,
        payload
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
      Updatelocalstorage({ license_id: res.data._id });
      return router.push("summary/");
    } catch (error) {
      return toast({
        title: "Error",
        description: "Some error occured",
      });
    }
  };
  const [selectedCat, setSelectedCat] = useState<any>([]);
  return (
    <div className=" flex flex-col w-full">
      <form
        className=" w-[100%] bg-custom-50 p-8 gap-8 flex flex-col"
        encType="multipart/form-data"
        onSubmit={handleSubmit((data) => handlePersonalData(data))}
      >
        <Outline title="License Information">
          <div className="grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2">
            {licenseData?.map((item: any) => {
              return (
                <div className=" flex flex-col gap-1 items-start justify-start">
                  {handleFormData(item, register)}
                </div>
              );
            })}
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <span>Select Category</span>
              <Select
                options={licenseCategoryData.options}
                value={selectedCat}
                onChange={setSelectedCat}
                isMulti
                className=" py-1 rounded-[6px] w-[90%] bg-custom-50 z-50"
                classNamePrefix={"select"}
                styles={customStyles}
              />
            </div>
          </div>
        </Outline>
        <Outline title="License Picture">
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
                        ? "Picture Uploaded"
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
                {pictureFront && (
                  <X
                    size={20}
                    className="cursor-pointer hover:scale-105"
                    onClick={() => setPictureFront(null)}
                  />
                )}
              </FullFlex>
              <FullFlex className=" w-full">
                {pictureFront && (
                  <img
                    src={pictureFront}
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
                        ? "Back picture uploaded."
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
                {pictureBack && (
                  <X
                    size={20}
                    className="cursor-pointer hover:scale-105"
                    onClick={() => setPictureBack(null)}
                  />
                )}
              </FullFlex>
              <FullFlex className=" w-full">
                {pictureBack && (
                  <img
                    src={pictureBack}
                    alt="profile"
                    className="w-full h-[240px] object-cover"
                  />
                )}
              </FullFlex>
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
  );
}
