import React, { ChangeEvent, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Outline from "../FormDetail/Outline";
import FullFlex from "../Fullflex";
import { ChevronRight, SwitchCamera, X } from "lucide-react";
import { apiinstance } from "@/services/Api";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
export default function LicimageEditForm({ licenseInformation }: any) {
  const { data: session } = useSession();
  const closeref = useRef<any>(null);
  const [prevImage, setPrevImage] = useState<string>(licenseInformation.front);
  const [prevImageBack, setPrevImageBack] = useState<string>(
    licenseInformation.back
  );
  const [newImage, setNewImage] = useState<string>();
  const [newImageBack, setNewImageBack] = useState<string>();
  const { toast } = useToast();

  const { handleSubmit } = useForm();
  const handleImageData = async () => {
    const payload = {
      ...licenseInformation,
      front: newImage,
      back: newImageBack,
    };
    try {
      const res = await apiinstance.put(
        `/user/information/${session?.user?.id}/license/image`,
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
      closeref && closeref?.current?.click();
      return;
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error.message,
      });
    }
  };
  const onChangeFrontPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setNewImage(fileReader.result as string);
      };
    }
  };
  const onChangeBackPicture = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        setNewImageBack(fileReader.result as string);
      };
    }
  };
  const profileFrontref = useRef<any>(null);
  const profileBackref = useRef<any>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Change Picture</Button>
      </DialogTrigger>
      <DialogContent className=" min-w-fit">
        <DialogHeader>
          <DialogTitle>Change License Image</DialogTitle>
          <DialogDescription>
            This is the license image edit form.
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col w-full">
          <form
            className=" w-[100%] bg-custom-50 p-2 gap-7 flex flex-col"
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => handleImageData())}
          >
            <Outline title="License Old Image">
              <div className=" w-full grid grid-cols-2 gap-3 items-center justify-between md:px-3 px-0 py-2">
                <FullFlex className=" w-full">
                  {prevImage && (
                    <img
                      src={prevImage}
                      alt="profile"
                      className="w-full md:h-[180px] h-[100px] object-fit"
                    />
                  )}
                </FullFlex>
                <FullFlex className=" w-full">
                  {prevImageBack && (
                    <img
                      src={prevImageBack}
                      alt="profile"
                      className="w-full md:h-[180px] h-[100px] object-fit"
                    />
                  )}
                </FullFlex>
              </div>
            </Outline>
            <Outline title="License new picture">
              <div className=" flex gap-3">
                <FullFlex className="items-start border-[1px] border-custom-100 p-2 flex-col w-[49%]">
                  <FullFlex className=" w-full items-center gap-2 justify-between mr-4">
                    <div
                      onClick={() => profileFrontref.current?.click()}
                      className="flex items-center justify-start w-[60%]"
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        <SwitchCamera size={40} className="cursor-pointer" />
                        <p className=" disabled">Upload Front Picture</p>
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
                      onClick={() => setNewImage("")}
                    />
                  </FullFlex>
                  <FullFlex className=" w-full">
                    {newImage && (
                      <img
                        src={newImage}
                        alt="profile"
                        className="w-full md:h-[180px] h-[50px] object-fit"
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
                        <p className=" disabled">Upload Back Picture</p>
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
                      onClick={() => setNewImageBack("")}
                    />
                  </FullFlex>
                  <FullFlex className=" w-full">
                    {newImageBack && (
                      <img
                        src={newImageBack}
                        alt="profile"
                        className="w-full md:h-[180px] h-[50px] object-cover"
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
