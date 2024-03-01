"use client";
import Outline from "@/components/common/FormDetail/Outline";
import AddressEditForm from "@/components/common/profile/AddressEditForm";
import CitimageEditForm from "@/components/common/profile/CitimageEditForm";
import CitizenshipEditForm from "@/components/common/profile/CitizenshipEditForm";
import LicenseEditForm from "@/components/common/profile/LicenseEditForm";
import LicimageEditForm from "@/components/common/profile/LicimageEditForm";
import PersonalEditForm from "@/components/common/profile/PersonalEditForm";
import {
  citizenshipData,
  licenseData,
  peraddressData,
  personalData,
  temporaryaddressData,
} from "@/components/detailform/FormData";
import ProfileLoader from "@/components/loaders/ProfileLoader";
import { Badge } from "@/components/ui/badge";
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
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
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
        const {
          guardian_name,
          permanent_address,
          temporary_address,
          ...others
        } = data?.information;
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
            dob: convertDate(others.DOB),
            gender: others.gender,
            bloodgroup: others.blood_group,
            guardiansname: guardian_name.name,
            guardiansrelation: guardian_name.relation,
            documentStatus: data?.documentStatus,
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
        session?.user?.id as string
      );
      if (success) {
        dispatch(
          setCitizenshipInformation({
            citizenship_no: data?.citizenship.citizenship_no,
            issue_date: convertDate(data?.citizenship.issue_date),
            issue_district: data?.citizenship.issue_district,
            type: data?.citizenship.citizenship_type,
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
        session?.user?.id as string
      );
      if (success) {
        dispatch(
          setLicenseInformation({
            licenseno: data?.license.license_no,
            category: data?.license.category,
            issuedate: convertDate(data?.license.license_date),
            expirydate: convertDate(data?.license.expire_date),
            office: data?.license.office,
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
    if (session?.user?.id) {
      try {
        setLoading(true);
        getPersonalInformation();
        session?.user?.citizenship_id !== "none" && getDocumentInformation();
        session?.user?.license_id !== "none" && getLicenseInformation();
      } finally {
        setLoading(false);
      }
    }
  }, [session?.user?.id]);
  return (
    <div className=" flex w-full items-start justify-start flex-col p-2 gap-4 ">
      <h1 className=" mb-4 font-bold text-custom-150 text-2xl">
        Profile Summary
      </h1>
      {status === "loading" || loading ? (
        <ProfileLoader />
      ) : (
        <div className=" w-[95%] flex flex-col gap-5 bg-custom-50 px-8 py-5">
          <Outline title="Personal Information">
            <div className=" w-full items-center flex justify-between">
              <div className="flex gap-2">
                {personalInformation?.documentStatus?.status !== true ? (
                  <div className=" flex gap-2">
                    <Badge variant="secondary">Pending</Badge>
                    {personalInformation?.documentStatus?.message && (
                      <p className=" text-red-500">
                        Message: {personalInformation?.documentStatus?.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className=" flex gap-2">
                    <Badge variant="success">Verified</Badge>
                  </div>
                )}
              </div>
              {Object.keys(personalInformation).length > 0 && (
                <PersonalEditForm personalInformation={personalInformation} />
              )}
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
              {addressInformation?.permanentAddress?.province != "" && (
                <AddressEditForm addressInformation={addressInformation} />
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
              {addressInformation?.temporaryaddress &&
                temporaryaddressData.map((item: any) => {
                  return (
                    <div
                      className=" flex flex-col gap-1 items-start justify-start"
                      key={item.name}
                    >
                      <p className="text-sm font-semibold">
                        {item.placeholder}
                      </p>
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
              {addressInformation?.permanentAddress?.province != "" && (
                <AddressEditForm addressInformation={addressInformation} />
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
              {addressInformation?.permanentAddress &&
                peraddressData.map((item: any) => {
                  return (
                    <div
                      className=" flex flex-col gap-1 items-start justify-start"
                      key={item.name}
                    >
                      <p className="text-sm font-semibold">
                        {item.placeholder}
                      </p>
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
            <div className=" w-full items-center flex justify-end gap-4">
              {Object.keys(citizenshipInformation).length > 0 && (
                <>
                  <CitizenshipEditForm
                    citizenshipInformation={citizenshipInformation}
                  />
                  <CitimageEditForm
                    citizenshipImages={citizenshipInformation}
                  />
                </>
              )}
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
              <img
                src={citizenshipInformation?.front}
                alt="front"
                className=" w-full h-[250px]"
              />
              <img
                src={citizenshipInformation?.back}
                alt="back"
                className=" w-full h-[250px]"
              />
            </div>
          </Outline>
          <Outline title="License Information">
            {licenseInformation &&
            Object.keys(licenseInformation).length > 0 ? (
              <>
                <div className=" w-full items-center flex justify-end gap-3">
                  {Object.keys(licenseInformation).length > 0 && (
                    <>
                      <LicenseEditForm
                        licenseInformation={licenseInformation}
                      />
                      <LicimageEditForm
                        licenseInformation={licenseInformation}
                      />
                    </>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
                  {Object.keys(licenseInformation).length > 0 &&
                    licenseData.map((item: any) => {
                      return (
                        <div
                          className=" flex flex-col gap-1 items-start justify-start"
                          key={item.value}
                        >
                          <p className="text-sm font-semibold">
                            {item.placeholder}
                          </p>
                          <p className=" border-[1px] border-custom-150 px-2 py-1">
                            {licenseInformation[item.name]?.toString() || "N/A"}
                          </p>
                        </div>
                      );
                    })}
                  {licenseInformation.category && (
                    <div className=" flex flex-col gap-1 items-start justify-start">
                      <p className="text-sm font-semibold">Category</p>
                      <p className=" border-[1px] border-custom-150 px-2 py-1">
                        {licenseInformation.category.toString()}
                      </p>
                    </div>
                  )}
                  <br />
                </div>
                <div className=" grid grid-cols-2 gap-3 items-center justify-between w-full px-3 py-2">
                  <img
                    src={licenseInformation?.front}
                    alt="front"
                    className=" w-full h-[250px]"
                  />
                  <img
                    src={licenseInformation?.back}
                    alt="back"
                    className=" w-full h-[250px]"
                  />
                </div>
              </>
            ) : (
              <p>No license information yet.</p>
            )}
          </Outline>
        </div>
      )}
    </div>
  );
}
