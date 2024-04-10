"use client";
import HeaderTitle from "@/components/common/HeaderTitle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { convertDate } from "@/utils/convertDate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const [loading, setLoading] = React.useState(false);
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [license, setLicense] = React.useState<any>({});
  const router = useRouter();

  async function getLicense() {
    try {
      setLoading(true);
      const res = await apiinstance.get(
        `/user/information/${session?.user?.id}/license`
      );
      if (res.status === 200) {
        setLicense(res?.data);
      }
    } catch (error: any) {
      router.push("/detailform/license");
      return toast({
        title: "Not found",
        description: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getLicense();
  }, []);
  return (
    <div className=" flex w-full pr-4 mt-1 flex-col gap-4">
      <HeaderTitle title="Renew license" />
      <div className=" w-[97%] px-5 bg-custom-50 py-3">
        <h2 className=" font-bold text-xl">License Information</h2>
        <p className=" text-red-600 text-sm">
          Note: You can only renew the license if the license is expired.
        </p>
        <div className="flex items-center justify-between w-full mt-4">
          {license?.license && (
            <div className="grid grid-cols-4 w-full gap-3">
              <div className=" flex gap-2 items-center justify-start">
                <p className=" font-bold">License No: </p>
                <p>{license?.license?.license_no}</p>
              </div>
              <div className=" flex gap-2 items-center justify-start">
                <p className=" font-bold">License Date:</p>
                <p>{convertDate(new Date(license?.license?.license_date))}</p>
              </div>
              <div className=" flex gap-2 items-center justify-start">
                <p className=" font-bold">Expire Date:</p>
                <p>{convertDate(new Date(license?.license?.expire_date))}</p>
              </div>
              <div className=" flex gap-2 items-center justify-start">
                <p className="font-bold">Category:</p>
                <p>{license?.license?.category.toString()}</p>
              </div>
            </div>
          )}
        </div>
        <div className=" grid grid-cols-2 gap-3 items-center justify-between w-full py-2 mt-3">
          <img
            src={license?.license?.image?.front}
            alt="front"
            className=" w-[90%] h-[250px]"
          />
          <img
            src={license?.license?.image?.back}
            alt="back"
            className=" w-[90%] h-[250px]"
          />
        </div>
        <div className=" w-full flex items-center justify-end gap-4 py-5 pr-2">
          <Button>Renew</Button>
        </div>
      </div>
    </div>
  );
}
