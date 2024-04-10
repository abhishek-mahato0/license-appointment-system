"use client";
import VerifyModal from "@/components/admin/applicants/VerifyModal";
import Outline from "@/components/common/FormDetail/Outline";
import HeaderTitle from "@/components/common/HeaderTitle";
import {
  citizenshipJsonData,
  informationJsonData,
  licenseJsonData,
} from "@/components/data/applicantData";
import { temporaryaddressData } from "@/components/detailform/FormData";
import ProfileLoader from "@/components/loaders/ProfileLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { capitalizeFirstLetter, convertDate } from "@/utils/convertDate";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const params = useParams();
  const { toast } = useToast();
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  async function getProfile() {
    setFetching(true);
    try {
      const res = await apiinstance.get(`/admin/users/${params.id}`);
      if (res.status === 200) {
        setLoading(false);
        return setData(res.data);
      }
      return toast({
        title: "Error",
        description: res?.data?.message,
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    } finally {
      setFetching(false);
    }
  }
  useEffect(() => {
    getProfile();
  }, [params.id]);

  async function updateStatus(status: string, remarks: string) {
    try {
      setLoading(true);
      const payload = {
        documentVerified: {
          status,
          message: remarks,
        },
      };
      const res = await apiinstance.patch(
        `/admin/users/${params?.id}`,
        payload
      );
      if (res.status === 200) {
        document.getElementById("close")?.click();
        getProfile();
        return toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "success",
        });
      }
      return toast({
        title: "Error",
        description: res?.data?.message,
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" w-full flex flex-col items-start justify-start gap-4">
      <HeaderTitle title="Applicant Profile" />
      {fetching ? (
        <ProfileLoader />
      ) : (
        <div className=" w-[99%] flex-col bg-custom-50 gap-5">
          <div className="w-full flex items-center justify-start bg-custom-50 text-gray-700">
            <div className="w-full flex items-start justify-start gap-5 px-6 py-4">
              <div className="w-[25%] bg-white rounded-lg">
                <img
                  src={data?.avatar || "/images/avatar.png"}
                  alt="profile"
                  className=" w-full h-[230px]"
                />
              </div>

              <div className="w-[75%] flex items-start justify-between">
                <div className="w-full flex flex-col items-start justify-between gap-2">
                  {data?.information_id !== "none" &&
                  data?.information_id?.hasOwnProperty("_id") ? (
                    informationJsonData.map((ele, index) => (
                      <div
                        key={index}
                        className="w-full flex items-start gap-4"
                      >
                        <div className="w-[20%] text-gray-500 font-bold">
                          {ele.name}
                        </div>
                        <div className=" text-gray-700">
                          {data?.information_id[ele?.value]
                            ? ele?.value === "DOB"
                              ? convertDate(data?.information_id[ele?.value])
                              : data?.information_id[ele?.value]
                            : "N/A"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No information uploaded yet</p>
                  )}
                </div>
                {data?.documentVerified?.status === "verified" ? (
                  <Badge variant="success">
                    {data?.documentVerified?.status}
                  </Badge>
                ) : (
                  <div className=" flex items-center gap-3">
                    <p className=" text-red-600 text-xs">
                      {data?.documentVerified?.message}
                    </p>
                    <Badge variant="default">
                      {data?.documentVerified?.status}
                    </Badge>
                    <VerifyModal
                      triggerChildren={<Button>Change Status</Button>}
                      onSubmit={(data: any, remarks: any) => {
                        updateStatus(data, remarks);
                      }}
                      title="Verify Profile"
                      initialValue="pending"
                      loading={loading}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 bg-custom-50 px-6 py-5">
            <Outline title="Temporary Address">
              <div className=" grid grid-cols-3 gap-y-3">
                {data?.information_id !== "none" &&
                data?.information_id?.hasOwnProperty("permanent_address") ? (
                  temporaryaddressData.map((ele, index) => (
                    <div className="flex gap-3" key={ele.id}>
                      <p className=" font-bold">
                        {capitalizeFirstLetter(ele.name)} :&nbsp;
                      </p>
                      <p>{data?.information_id?.permanent_address[ele.name]}</p>
                    </div>
                  ))
                ) : (
                  <p>No address information yet.</p>
                )}
              </div>
            </Outline>
            <Outline title="Permanent Address">
              <div className=" grid grid-cols-3">
                {data?.information_id !== "none" &&
                data?.information_id?.hasOwnProperty("temporary_address") ? (
                  temporaryaddressData.map((ele, index) => (
                    <div className="flex gap-3" key={ele.id}>
                      <p className=" font-bold">
                        {capitalizeFirstLetter(ele.name)} :&nbsp;
                      </p>
                      <p>{data?.information_id?.temporary_address[ele.name]}</p>
                    </div>
                  ))
                ) : (
                  <p> No temporary address uploaded yet.</p>
                )}
              </div>
            </Outline>
            <Outline title="Citizenship Information">
              <div className=" grid grid-cols-3">
                {data?.citizenship_id !== "none" &&
                data?.citizenship_id?.hasOwnProperty("user_id") ? (
                  citizenshipJsonData?.map((ele, index) => (
                    <div className="flex gap-[2px] mb-1" key={ele.id}>
                      <p className=" font-bold">
                        {capitalizeFirstLetter(ele.name)} :&nbsp;
                      </p>
                      <p>{data?.citizenship_id.citizenship[ele.value]}</p>
                    </div>
                  ))
                ) : (
                  <p>No citizenship uploaded yet</p>
                )}
              </div>
              <div className=" flex w-full justify-between items-center px-5">
                {data?.citizenship_id?.citizenship?.image && (
                  <div className=" grid grid-cols-2 w-[90%] gap-10">
                    <img
                      src={data?.citizenship_id?.citizenship?.image?.front}
                      alt="front"
                      className="w-[90%] h-[250px]"
                    />
                    <img
                      src={data?.citizenship_id?.citizenship?.image?.back}
                      alt="back"
                      className="w-[90%] h-[250px]"
                    />
                  </div>
                )}
              </div>
            </Outline>
            <Outline title="License Information">
              <div className=" grid grid-cols-3">
                {data?.license_id !== "none" &&
                data?.license_id?.hasOwnProperty("user_id") ? (
                  licenseJsonData?.map((ele, index) => (
                    <div className="flex gap-3" key={ele.id}>
                      <p className=" font-bold">
                        {capitalizeFirstLetter(ele.name)} :&bnsp;
                      </p>
                      <p>{data?.license_id?.license[ele.value]}</p>
                    </div>
                  ))
                ) : (
                  <p>No license uploaded yet.</p>
                )}
              </div>
              <div className=" flex w-full justify-between items-center px-5">
                {data?.license_id?.license?.image && (
                  <div className=" grid grid-cols-2 w-[90%] gap-10">
                    <img
                      src={data?.license_id?.license?.image?.front}
                      alt="front"
                      className="w-[90%] h-[250px]"
                    />
                    <img
                      src={data?.license_id?.license?.image?.back}
                      alt="back"
                      className="w-[90%] h-[250px]"
                    />
                  </div>
                )}
              </div>
            </Outline>
          </div>
        </div>
      )}
    </div>
  );
}
