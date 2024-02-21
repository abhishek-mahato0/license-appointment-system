"use client";
import Outline from "@/components/common/FormDetail/Outline";
import {
  citizenshipJsonData,
  informationJsonData,
  licenseJsonData,
} from "@/components/data/applicantData";
import { temporaryaddressData } from "@/components/detailform/FormData";
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
  const [loading, setLoading] = React.useState(true);
  async function getProfile() {
    setLoading(true);
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
    }
  }
  useEffect(() => {
    getProfile();
  }, [params.id]);
  return (
    <div className=" w-full flex flex-col items-start justify-start gap-4 mt-5">
      <h1>Profile of Applicant</h1>
      {!loading && (
        <div className=" w-full flex-col bg-custom-50 gap-5">
          <div className="w-full flex items-center justify-start bg-custom-50 text-gray-700">
            <div className="w-full flex items-start justify-start gap-5 px-6 py-4">
              <div className="w-[25%] bg-white rounded-lg">
                <img
                  src="/images/placeholder.png"
                  alt="profile"
                  className=" w-full h-[230px]"
                />
              </div>

              <div className="w-[75%] flex items-start justify-between">
                <div className="w-full flex flex-col items-start justify-between gap-2">
                  {informationJsonData.map((ele, index) => (
                    <div key={index} className="w-full flex items-start gap-4">
                      <div className="w-[20%] text-gray-500">{ele.name}</div>
                      <div className=" text-gray-700">
                        {data?.information_id[ele?.value]
                          ? ele?.value === "DOB"
                            ? convertDate(data?.information_id[ele?.value])
                            : data?.information_id[ele?.value]
                          : "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
                <Button>Verify Profile</Button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 bg-custom-50 px-6 py-5">
            <Outline title="Temporary Address">
              <div className=" grid grid-cols-3 gap-y-3">
                {temporaryaddressData.map((ele, index) => (
                  <div className="flex flex-col" key={ele.id}>
                    <p>{capitalizeFirstLetter(ele.name)}</p>
                    <p>{data?.information_id?.permanent_address[ele.name]}</p>
                  </div>
                ))}
              </div>
            </Outline>
            <Outline title="Permanent Address">
              <div className=" grid grid-cols-3">
                {temporaryaddressData.map((ele, index) => (
                  <div className="flex flex-col gap-3" key={ele.id}>
                    <p>{capitalizeFirstLetter(ele.name)}</p>
                    <p>{data?.information_id?.temporary_address[ele.name]}</p>
                  </div>
                ))}
              </div>
            </Outline>
            <Outline title="Citizenship Information">
              <div className=" grid grid-cols-3">
                {citizenshipJsonData.map((ele, index) => (
                  <div className="flex flex-col gap-3" key={ele.id}>
                    <p>{capitalizeFirstLetter(ele.name)}</p>
                    <p>{data?.citizenship_id.citizenship[ele.value]}</p>
                  </div>
                ))}
              </div>
            </Outline>
            <Outline title="License Information">
              <div className=" grid grid-cols-3">
                {licenseJsonData.map((ele, index) => (
                  <div className="flex flex-col gap-3" key={ele.id}>
                    <p>{capitalizeFirstLetter(ele.name)}</p>
                    <p>{data?.license_id?.license[ele.value]}</p>
                  </div>
                ))}
              </div>
            </Outline>
          </div>
        </div>
      )}
    </div>
  );
}
