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
import LoaderButton from "../common/LoaderButton";

export default function LicenseForm() {
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pictureFront, setPictureFront] = useState<any>(null);
  const [pictureBack, setPictureBack] = useState<any>(null);
  const [frontImage, setFrontImage] = useState<any>(null);
  const [backImage, setBackImage] = useState<any>(null);

  const onChangeFrontPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFrontImage(e.target.files[0]);
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
      setBackImage(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setPictureBack(fileReader.result as string);
      };
    }
  };
  const profileFrontref = useRef<any>(null);
  const profileBackref = useRef<any>(null);

  async function verifyImage(): Promise<{ success: boolean; message: string }> {
    const formdata = new FormData();
    formdata.append("front_image", frontImage as Blob);
    formdata.append("back_image", backImage as Blob);
    try {
      const res = await apiinstance.post(
        `${process.env.FLASK_SERVER}/predict/license`,
        formdata
      );

      if (res.status === 200) {
        const { data } = res;
        if (data?.front_prediction === "0" && data?.back_prediction === "0") {
          return {
            success: false,
            message: "Invalid images for license. Please upload a valid image.",
          };
        } else if (
          data?.front_prediction === "1" &&
          data?.back_prediction === "0"
        ) {
          return {
            success: false,
            message: "Invalid back image for license.",
          };
        } else if (
          data?.front_prediction === "0" &&
          data?.back_prediction === "1"
        ) {
          return {
            success: false,
            message: "Invalid front image for license.",
          };
        }
        return {
          success: true,
          message: "Valid image for license.",
        };
      }
      return {
        success: false,
        message: "Invalid image for license.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Invalid image for license.",
      };
    }
  }

  const { register, handleSubmit } = useForm();
  const handlePersonalData = async (data: any) => {
    setLoading(true);
    if (!pictureFront || !pictureBack) {
      return toast({
        title: "Error",
        description: "Please upload both front and back picture.",
      });
    }
    const { success, message } = await verifyImage();
    if (!success) {
      setLoading(false);
      return toast({
        title: "Error",
        description: message,
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
      // Updatelocalstorage({ license_id: res.data._id });
      update({
        license_id: res?.data._id,
      });
      return router.push("/profile");
    } catch (error) {
      return toast({
        title: "Error",
        description: "Some error occured",
      });
    } finally {
      setLoading(false);
    }
  };
  const [selectedCat, setSelectedCat] = useState<any>([]);
  return (
    <div className=" flex flex-col w-full">
      <form
        className=" w-[100%] bg-custom-50 p-8 gap-8 flex flex-col md:h-auto h-[1300px]"
        encType="multipart/form-data"
        onSubmit={handleSubmit((data) => handlePersonalData(data))}
      >
        <Outline title="License Information">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-0 py-2">
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
          <div className="flex md:justify-between justify-start items-start w-full gap-2 md:flex-row flex-col">
            <FullFlex className="items-start border-[1px] border-custom-100 p-2 flex-col md:w-[49%] w-full">
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
                    className="w-full md:h-[240px] h-[180px] object-fit"
                  />
                )}
              </FullFlex>
            </FullFlex>
            <FullFlex className="items-start border-[1px] border-custom-100 p-2 flex-col md:w-[49%] w-full">
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
                    className="w-full md:h-[240px] h-[180px] object-fit"
                  />
                )}
              </FullFlex>
            </FullFlex>
          </div>
        </Outline>
        <div className=" flex items-center justify-end w-full">
          <LoaderButton className=" rounded-sm" type="submit" loading={loading}>
            Next
            <p>
              <ChevronRight width={17} />
            </p>
          </LoaderButton>
        </div>
      </form>
    </div>
  );
}
