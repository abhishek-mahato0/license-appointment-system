"use client";
import ChangePassword from "@/components/common/ChangePassword";
import Outline from "@/components/common/FormDetail/Outline";
import HeaderTitle from "@/components/common/HeaderTitle";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/TypedHooks";
import {
  setAddressInformation,
  setCitizenshipInformation,
  setLicenseInformation,
  setPersonalInformation,
} from "@/redux/slices/profileInformationSlice";
import { convertDate } from "@/utils/convertDate";
import { fetchUserPersonalInformation } from "@/utils/fetchUserInformation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

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
      if (data?.information_id === "none") {
        return router.push("/detailform/personal");
      }
      if (success) {
        const {
          guardian_name,
          permanent_address,
          temporary_address,
          ...others
        } = data?.information_id;
        const { citizenship_id, license_id } = data;

        dispatch(
          setAddressInformation({
            permanentAddress: permanent_address,
            temporaryaddress: temporary_address,
          })
        );
        dispatch(
          setCitizenshipInformation({
            citizenship_no: citizenship_id?.citizenship?.citizenship_no,
            issue_date: convertDate(citizenship_id?.citizenship?.issue_date),
            issue_district: citizenship_id?.citizenship?.issue_district,
            type: citizenship_id?.citizenship?.citizenship_type,
            front: citizenship_id?.citizenship?.image.front,
            back: citizenship_id?.citizenship?.image.back,
          })
        );
        dispatch(
          setLicenseInformation({
            licenseno: license_id?.license?.license_no,
            category: license_id?.license?.category,
            issuedate:
              license_id?.license?.license_date &&
              convertDate(license_id?.license?.license_date),
            expirydate:
              license_id?.license?.expire_date &&
              convertDate(license_id?.license?.expire_date),
            office: license_id?.license?.office,
            front: license_id?.license?.image.front,
            back: license_id?.license?.image.back,
          })
        );
        return dispatch(
          setPersonalInformation({
            firstName: others?.first_name,
            middlename: others.middle_name,
            lastname: others.last_name,
            email: others.email,
            phone: others.phone,
            dob: convertDate(others.DOB),
            gender: others.gender,
            bloodgroup: others.blood_group,
            guardiansname: guardian_name?.name,
            guardiansrelation: guardian_name?.relation,
            documentStatus: data?.documentVerified,
          })
        );
      } else {
        return toast({
          title: "Error",
          description: message,
        });
      }
    }

    if (!session?.user?.id) {
      return router.push("/login");
    }
    if (session?.user?.id) {
      try {
        setLoading(true);
        getPersonalInformation();
      } finally {
        setLoading(false);
      }
    }
  }, [session]);
  return (
    <div className=" flex w-full items-start justify-start flex-col p-2 gap-4 mt-5 md:mt-1">
      <HeaderTitle title="Profile Summary" />
      {status === "loading" || loading ? (
        <ProfileLoader />
      ) : (
        <div className=" md:w-[95%] w-[98%] flex flex-col gap-5 bg-custom-50 px-8 py-5">
          <div className=" w-full items-center justify-end gap-3 flex">
            <div className="flex gap-2">
              {personalInformation?.documentStatus?.status !== "verified" ? (
                <div className=" flex gap-2">
                  <Badge variant="secondary">
                    {personalInformation?.documentStatus?.status}
                  </Badge>
                  {personalInformation?.documentStatus?.message && (
                    <p className=" text-red-500 text-xs">
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
            <ChangePassword
              triggerChildren={<Button>Change Password</Button>}
            />
          </div>
          <Outline title="Personal Information">
            <div className=" w-full items-center flex justify-end">
              {Object.keys(personalInformation).length > 0 && (
                <PersonalEditForm personalInformation={personalInformation} />
              )}
            </div>
            <div className=" w-full grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between px-3 py-2">
              {session?.user?.avatar && (
                <img
                  src={session?.user?.avatar}
                  alt="profile"
                  className=" w-full h-full rounded-sm"
                />
              )}
              <div className=" col-span-2 grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-1 py-2">
                {personalData?.map((item: any) => {
                  return (
                    <div
                      className=" flex flex-col gap-1 items-start justify-start"
                      key={item.value}
                    >
                      <p className="text-sm font-semibold">
                        {item.placeholder}
                      </p>
                      <p className=" border-[1px] border-custom-150 px-2 py-1">
                        {personalInformation[item.name] || "N/A"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Outline>
          <Outline title="Temporary Address">
            <div className=" w-full items-center flex justify-end">
              {addressInformation?.permanentAddress?.province != "" && (
                <AddressEditForm addressInformation={addressInformation} />
              )}
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-[2px] py-2">
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
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between w-full px-3 py-2">
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
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-[2px] py-2">
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
            <div className=" grid md:grid-cols-2 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-0 py-2">
              <img
                src={citizenshipInformation?.front}
                alt="front"
                className=" w-full md:h-[250px] h-[160px]"
              />
              <img
                src={citizenshipInformation?.back}
                alt="back"
                className=" w-full md:h-[250px] h-[160px]"
              />
            </div>
          </Outline>
          <Outline title="License Information">
            {licenseInformation &&
            Object.keys(licenseInformation).length > 1 ? (
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
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-[2px] py-2">
                  {Object.keys(licenseInformation)?.length > 0 &&
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
                <div className=" grid md:grid-cols-2 grid-cols-1 gap-3 items-center justify-between w-full md:px-3 px-0 py-2">
                  <img
                    src={licenseInformation?.front}
                    alt="front"
                    className=" w-full md:h-[250px] h-[160px]"
                  />
                  <img
                    src={licenseInformation?.back}
                    alt="back"
                    className=" w-full md:h-[250px] h-[160px]"
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
