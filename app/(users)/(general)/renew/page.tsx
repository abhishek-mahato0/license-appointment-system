"use client";
import HeaderTitle from "@/components/common/HeaderTitle";
import LoaderButton from "@/components/common/LoaderButton";
import { SearchSelect } from "@/components/common/Searchselect";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { updatedprovinces } from "@/components/data/ProvinceList";
import { useToast } from "@/components/ui/use-toast";
import { apiinstance } from "@/services/Api";
import { getAllOffices } from "@/utils/officeInfo";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [office, setOffice] = useState<any>([]);
  const [filteredOffice, setFilteredOffice] = useState<any>([]);
  const [selectedProv, setSelectedProv] = useState<string>("1");
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  async function getOfficeList() {
    const { success, data, error } = await getAllOffices();
    if (success) {
      return setOffice(
        data.map((ele: any) => ({
          id: ele?._id,
          label: ele?.name,
          name: ele?.name,
          province: ele.province,
          district: ele?.district,
          value: ele?._id,
        }))
      );
    }
    return setOffice([]);
  }
  useMemo(() => {
    getOfficeList();
  }, []);

  useEffect(() => {
    if (!office) {
      return;
    }
    const lists = office.filter(
      (ele: any) => ele.province.toString() === selectedProv?.toString()
    );
    setFilteredOffice(lists);
  }, [selectedProv]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitRenewForm = async (data: any) => {
    setLoading(true);
    if (!selectedOffice || !selectedProv) {
      setLoading(false);
      return toast({
        title: "Error",
        description: "Please select province and office",
      });
    }
    try {
      const res = await apiinstance.post("/user/renew", {
        license_no: data.license_no,
        tracking_id: data.tracking_id,
        office: selectedOffice,
        province: selectedProv,
      });
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "License renew successfully applied.",
          variant: "success",
        });
        return router.push("/dashboard");
      }
      return toast({
        title: "Error",
        description: res?.data?.message || "Something went wrong",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: "Error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex w-full pr-4 mt-1 flex-col gap-4">
      <HeaderTitle title="Renew license" />
      <form
        className=" w-[90%] px-5 ml-4 bg-custom-50 py-3"
        onSubmit={handleSubmit((data) => submitRenewForm(data))}
      >
        <div className=" w-full grid grid-cols-2 gap-8 py-4">
          <div className=" flex flex-col gap-2">
            <label>License No.</label>
            <input
              {...register("license_no", { required: true })}
              placeholder="Enter License No.."
              className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
              type="text"
            />
            {errors?.license_no && errors?.license_no.type === "required" && (
              <span className=" text-xs font-light text-red-600">
                License no is required
              </span>
            )}
          </div>
          <div className=" flex flex-col gap-2">
            <label>Phone Number.</label>
            <input
              {...register("tracking_id", {
                required: true,
                maxLength: 10,
                minLength: 10,
              })}
              placeholder="Enter Phone Number"
              className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
              type="text"
            />
            {errors?.tracking_id && errors?.tracking_id.type === "maxLength" ? (
              <span className=" text-xs font-light text-red-600">
                Phone must be 10 digits long
              </span>
            ) : (
              <span className=" text-xs font-light text-red-600">
                Phone Number is required.
              </span>
            )}
          </div>
          <div className="w-[90%] flex gap-2 items-center justify-center">
            <p className=" min-w-fit">Select Province: </p>
            <SingleSelect
              data={updatedprovinces}
              onSelect={(val: any) => setSelectedProv(val)}
              placeholder="Select Province"
              value={selectedProv}
            />
          </div>

          {selectedProv && filteredOffice && (
            <div className="w-[90%] flex gap-2 items-center justify-center">
              <p className=" min-w-fit">Select Office: </p>
              <SearchSelect
                data={filteredOffice}
                onSelect={(val) => setSelectedOffice(val)}
                placeholder="Select Office"
                className=" border-custom-150"
              />
            </div>
          )}
        </div>
        <div className=" w-full flex items-center justify-end gap-4 py-5 pr-2">
          <LoaderButton type="submit" loading={loading}>
            Renew
          </LoaderButton>
        </div>
      </form>
    </div>
  );
}
