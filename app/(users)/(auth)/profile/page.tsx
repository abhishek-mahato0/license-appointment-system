"use client";
import Outline from "@/components/common/FormDetail/Outline";
import PersonalEditForm from "@/components/common/profile/PersonalEditForm";
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
  setAddressInformation,
  setCitizenshipInformation,
  setLicenseInformation,
  setPersonalInformation,
} from "@/redux/slices/profileInformationSlice";
import { convertDate } from "@/utils/convertDate";
import {
  fetchUserCitizenshipInformation,
  fetchUserLicenseInformation,
  fetchUserPersonalInformation,
} from "@/utils/fetchUserInformation";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useReducer, useRef } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { data: session } = useSession();
  const { id } = JSON.parse(localStorage.getItem("userInfo") || "");
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
        id as string
      );
      if (success) {
        const {
          guardian_name,
          permanent_address,
          temporary_address,
          ...others
        } = data;
        dispatch(
          setAddressInformation({
            permanentAddress: permanent_address,
            temporaryaddress: temporary_address,
          })
        );
        return dispatch(
          setPersonalInformation({
            firstName: others.first_name,
            middlename: others.middle_name,
            lastname: others.last_name,
            email: others.email,
            phone: others.phone,
            dob: others.DOB,
            gender: others.gender,
            bloodgroup: others.blood_group,
            guardiansname: guardian_name.name,
            guardiansrelation: guardian_name.relation,
          })
        );
      } else {
        return toast({
          title: "Error",
          description: message,
        });
      }
    }

    async function getDocumentInformation() {
      const { data, success, message } = await fetchUserCitizenshipInformation(
        id as string
      );
      if (success) {
        dispatch(
          setCitizenshipInformation({
            citizenshipno: data?.citizenship.citizenship_no,
            citizenshipissuedate: convertDate(data?.citizenship.issue_date),
            citizenshipissuedistrict: data?.citizenship.issue_district,
            citizenshiptype: data?.citizenship.type,
            front: data?.citizenship.image.front,
            back: data?.citizenship.image.back,
          })
        );
      } else {
        return toast({
          title: "Error",
          description: message,
        });
      }
    }
    async function getLicenseInformation() {
      const { data, success, message } = await fetchUserLicenseInformation(
        id as string
      );
      if (success) {
        dispatch(
          setLicenseInformation({
            licenseno: data?.license.license_no,
            category: data?.license.category,
            licensedate: convertDate(data?.license.license_date),
            expiredate: convertDate(data?.license.expire_date),
            office: data?.license.office,
            province: data?.license.province,
            front: data?.license.image.front,
            back: data?.license.image.back,
          })
        );
      } else {
        return toast({
          title: "Error",
          description: message,
        });
      }
    }
    if (id) {
      getPersonalInformation();
      getDocumentInformation();
      getLicenseInformation();
    }
  }, [id]);
  return (
    <div className=" flex w-full items-start justify-start flex-col p-2 gap-4 ">
      <h1 className=" mb-4 font-bold text-custom-150 text-2xl">
        Profile Summary
      </h1>
      <div className=" w-[95%] flex flex-col gap-5 bg-custom-50 px-8 py-5">
        <Outline title="Personal Information">
          <div className=" w-full items-center flex justify-end">
            <PersonalEditForm />
          </div>
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
          <div className=" w-full items-center flex justify-end">
            <Edit className="w-6 h-6 text-custom-150 cursor-pointer" />
          </div>
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
          <div className=" w-full items-center flex justify-end">
            <Edit className="w-6 h-6 text-custom-150 cursor-pointer" />
          </div>
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
          <div className=" w-full items-center flex justify-end">
            <Edit className="w-6 h-6 text-custom-150 cursor-pointer" />
          </div>
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
          <div className=" w-full items-center flex justify-end">
            <Edit className=" text-custom-150 cursor-pointer" />
          </div>

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
      </div>
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
