import React, { useRef, useState } from "react";
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
import { useSelector } from "react-redux";

export default function PersonalEditForm() {
  const {
    personalInformation,
    addressInformation,
    citizenshipInformation,
    licenseInformation,
  } = useSelector((state: any) => state.profileInformation);
  const [editedpersonalData, setEditedPersonalDate] =
    useState(personalInformation);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="w-6 h-6 text-custom-150 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className=" min-w-fit">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2">
            {personalData?.map((item: any) => {
              return (
                <div
                  className=" flex flex-col gap-1 items-start justify-start"
                  key={item.value}
                >
                  {item.type === "select" ? (
                    <>
                      <label>{item.placeholder}</label>
                      <select
                        className=" py-1 px-2 rounded-[6px] w-[90%] bg-custom-50 border-[1px] border-custom-100"
                        onSelect={(e) =>
                          setEditedPersonalDate(...editedpersonalData)
                        }
                      >
                        {item.options &&
                          item?.options.map((option: any) => {
                            return (
                              <option value={option.value}>
                                {option.name}
                              </option>
                            );
                          })}
                      </select>
                    </>
                  ) : (
                    <>
                      <label>{item.placeholder}</label>
                      <input
                        name={item.name}
                        required
                        placeholder={item.placeholder}
                        className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
                        type={item.type}
                        value={personalInformation[item.name]}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
