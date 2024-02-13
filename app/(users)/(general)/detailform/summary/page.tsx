"use client";
import Outline from "@/components/common/FormDetail/Outline";
import {
  citizenshipData,
  licenseData,
  peraddressData,
  personalData,
  temporaryaddressData,
} from "@/components/detailform/FormData";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/TypedHooks";
import {
  setCitizenshipInformation,
  setLicenseInformation,
  setPersonalInformation,
} from "@/redux/slices/profileInformationSlice";
import {
  fetchUserCitizenshipInformation,
  fetchUserPersonalInformation,
} from "@/utils/fetchUserInformation";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const {
    personalInformation,
    addressInformation,
    citizenshipInformation,
    licenseInformation,
  } = useSelector((state: any) => state.profileInformation);

  useEffect(() => {
    async function getPersonalInformation() {
      const { data, success, message } = await fetchUserPersonalInformation(
        session?.user?.id as string
      );
      if (success) {
        return dispatch(setPersonalInformation(data));
      } else {
        return toast({
          title: "Error",
          description: message,
        });
      }
    }

    async function getDocumentInformation() {
      const { data, success, message } = await fetchUserCitizenshipInformation(
        session?.user?.id as string
      );
      if (success) {
        dispatch(setCitizenshipInformation(data?.citizenship));
        dispatch(setLicenseInformation(data?.license));
      } else {
        return toast({
          title: "Error",
          description: message,
        });
      }
    }
    if (session?.user?.id) {
      getPersonalInformation();
      getDocumentInformation();
    }
  }, [session?.user?.id]);

  // const saveProfileDetails = async () => {
  //   try {
  //     const payload = {
  //       personalInformation,
  //       addressInformation,
  //       citizenshipInformation,
  //       licenseInformation,
  //     };

  //     const res = await apiinstance.post(
  //       `user/information/${session?.user?.id}`,
  //       payload
  //     );
  //     if (res.status === 200) {
  //       console.log("saved");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className=" flex w-full items-start justify-start flex-col p-2 gap-4">
      <h1 className=" mb-4 font-bold ">Profile Summary</h1>
      <Outline title="Personal Information">
        <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
          {personalData?.map((item: any) => {
            return (
              <div
                className=" flex flex-col gap-1 items-start justify-start"
                key={item.value}
              >
                <p className="text-sm font-semibold">{item.placeholder}</p>
                <p className=" border-[1px] border-custom-150 px-2 py-1">
                  {personalInformation[item.name] || "N/A"}
                </p>
              </div>
            );
          })}
        </div>
      </Outline>
      <Outline title="Temporary Address">
        <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
          {addressInformation?.temporaryaddress &&
            temporaryaddressData.map((item: any) => {
              return (
                <div
                  className=" flex flex-col gap-1 items-start justify-start"
                  key={item.name}
                >
                  <p className="text-sm font-semibold">{item.placeholder}</p>
                  <p className=" border-[1px] border-custom-150 px-2 py-1">
                    {addressInformation.temporaryaddress[item.name]
                      ? addressInformation.temporaryaddress[item.name]
                      : "N/A"}
                  </p>
                </div>
              );
            })}
        </div>
      </Outline>
      <Outline title="Permanent Address">
        <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
          {addressInformation?.permanentAddress &&
            peraddressData.map((item: any) => {
              return (
                <div
                  className=" flex flex-col gap-1 items-start justify-start"
                  key={item.name}
                >
                  <p className="text-sm font-semibold">{item.placeholder}</p>
                  <p className=" border-[1px] border-custom-150 px-2 py-1">
                    {addressInformation.permanentAddress[item.name]
                      ? addressInformation.permanentAddress[item.name]
                      : "N/A"}
                  </p>
                </div>
              );
            })}
        </div>
      </Outline>
      <Outline title="Citizenship Information">
        <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
          {citizenshipData.map((item: any) => {
            return (
              <div
                className=" flex flex-col gap-1 items-start justify-start"
                key={item.value}
              >
                <p className="text-sm font-semibold">{item.placeholder}</p>
                <p className=" border-[1px] border-custom-150 px-2 py-1">
                  {citizenshipInformation[item.name] || "N/A"}
                </p>
              </div>
            );
          })}
          <br />
        </div>
        <div className=" grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2">
          <img src={citizenshipInformation?.front} alt="front" />
          <img src={citizenshipInformation?.back} alt="back" />
        </div>
      </Outline>
      <Outline title="License Information">
        <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
          {licenseData.map((item: any) => {
            return (
              <div
                className=" flex flex-col gap-1 items-start justify-start"
                key={item.value}
              >
                <p className="text-sm font-semibold">{item.placeholder}</p>
                <p className=" border-[1px] border-custom-150 px-2 py-1">
                  {citizenshipInformation[item.name] || "N/A"}
                </p>
              </div>
            );
          })}
          <br />
        </div>
        <div className=" grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2">
          <img src={licenseInformation?.front} alt="front" />
          <img src={licenseInformation?.back} alt="back" />
        </div>
      </Outline>
      <div className=" w-full flex items-center justify-end gap-4">
        {/* <Button
          disabled={areAllObjectsEmpty([
            personalInformation,
            addressInformation?.permanentAddress &&
              addressInformation?.permanentAddress,
            addressInformation?.temporaryaddress &&
              addressInformation?.temporaryaddress,
            citizenshipInformation,
          ])}
          onClick={saveProfileDetails}
        >
          Save
        </Button> */}
      </div>
    </div>
  );
}
