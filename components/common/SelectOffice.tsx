"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import {
  setBarstate,
  setSelectedOffice,
  setSelectedProv,
} from "@/redux/slices/applynewSlice";
import FullFlex from "./Fullflex";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { getAllOffices } from "@/utils/officeInfo";
import { provinces } from "../data/ProvinceList";
import { SearchSelect } from "./Searchselect";

type office = {
  id: number;
  province: number;
  district: number;
  name: string;
  label: string;
  value: number;
};
export default function SelectOffice() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedProv, selectedCat, selectedOffice } = useAppSelector(
    (state) => state.applynew
  );
  const [office, setOffice] = useState<any>([]);
  const [filteredOffice, setFilteredOffice] = useState<any>([]);
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

  const [Selectedcenters, setSelectedCenters] = useState<any>(null);
  useEffect(() => {
    if (!office) {
      return;
    }
    const lists = office.filter(
      (ele: any) => ele.province.toString() === selectedProv?.toString()
    );
    setFilteredOffice(lists);
  }, [selectedProv, dispatch]);
  // useEffect(() => {
  //   !selectedCat && router.push("/apply/2");
  // }, [selectedCat, dispatch]);
  return (
    <FullFlex className="flex-col gap-4 w-full">
      <div className=" w-full flex justify-center items-center gap-10">
        <div className="flex items-center justify-between gap-3">
          <p className=" text-customtext-100">Select Province: </p>
          <Select onValueChange={(val) => dispatch(setSelectedProv(val))}>
            <SelectTrigger className="w-[180px] text-customtext-100">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((ele) => {
                return (
                  <div
                    className=" hover:bg-custom-100 hover:text-white"
                    key={ele.id}
                  >
                    <SelectItem value={ele?.value.toString()}>
                      {ele?.label}
                    </SelectItem>
                  </div>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {office && selectedProv && (
          <div className="w-[30%] flex gap-2 items-center justify-center">
            <p className=" min-w-fit">Select Office: </p>
            <SearchSelect
              data={filteredOffice}
              onSelect={(val) => dispatch(setSelectedOffice(val))}
              placeholder="Select Office"
            />
          </div>

          // <FullFlex className=" gap-3">
          //   <p>Select Office: </p>
          //   <Select onValueChange={(val) => dispatch(setSelectedOffice(val))}>
          //     <SelectTrigger className="w-[180px] truncate">
          //       <SelectValue placeholder="Select Office" />
          //     </SelectTrigger>
          //     <SelectContent>
          //       {office?.map((ele: any) => {
          //         return (
          //           <div
          //             className=" hover:bg-custom-100 hover:text-white"
          //             key={ele.id}
          //           >
          //             <SelectItem value={ele}>{ele}</SelectItem>
          //           </div>
          //         );
          //       })}
          //     </SelectContent>
          //   </Select>
          // </FullFlex>
        )}
      </div>
      <div className=" w-full flex items-center justify-end">
        {" "}
        <Button
          className=" rounded-sm"
          disabled={!selectedOffice}
          onClick={() => {
            setLoading(true);
            // dispatch(setBarstate({ active: 4, completed: [1, 2, 3] }));
            router.push("/apply/4");
            setLoading(false);
          }}
        >
          {loading ? (
            "Loading"
          ) : (
            <>
              Next
              <p>
                <ChevronRight width={17} />
              </p>
            </>
          )}
        </Button>
      </div>
    </FullFlex>
  );
}
