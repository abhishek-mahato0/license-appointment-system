"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import {
  setSelectedOffice,
  setSelectedProv,
} from "@/redux/slices/applynewSlice";
import FullFlex from "./Fullflex";
import { useRouter } from "next/navigation";

type office = {
  id: number;
  province: number;
  centres: Array<string>;
};
export default function SelectOffice() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedProv, selectedCat } = useAppSelector(
    (state) => state.applynew
  );
  let office = [
    {
      id: 1,
      province: 1,
      centers: [
        "Bhaktapur",
        "lalitpur lsdfa .asfdjkla kljslkdfjl ljsaldjf",
        "kathmandu",
      ],
    },
    {
      id: 2,
      province: 2,
      centers: ["Lahan", "Janakpur", "Madan"],
    },
  ];
  const [Selectedcenters, setSelectedCenters] = useState<any>(null);
  useEffect(() => {
    selectedProv &&
      setSelectedCenters(
        office.filter((ele) => ele.province.toString() == selectedProv)
      );
  }, [selectedProv, dispatch]);
  useEffect(() => {
    !selectedCat && router.push("/apply/2");
  }, [selectedCat, dispatch]);
  return (
    <div className=" w-full flex justify-center items-center gap-6">
      <div className=" flex items-center justify-between gap-3">
        <p className=" text-customtext-100">Select Province: </p>
        <Select onValueChange={(val) => dispatch(setSelectedProv(val))}>
          <SelectTrigger className="w-[180px] text-customtext-100">
            <SelectValue placeholder="Select Province" />
          </SelectTrigger>
          <SelectContent>
            {office.map((ele) => {
              return (
                <div
                  className=" hover:bg-custom-100 hover:text-white"
                  key={ele.id}
                >
                  <SelectItem value={ele.province.toString()}>
                    {ele.province}
                  </SelectItem>
                </div>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {selectedProv && Selectedcenters && (
        <FullFlex className=" gap-3">
          <p>Select Office: </p>
          <Select onValueChange={(val) => dispatch(setSelectedOffice(val))}>
            <SelectTrigger className="w-[180px] truncate">
              <SelectValue placeholder="Select Office" />
            </SelectTrigger>
            <SelectContent>
              {Selectedcenters[0]?.centers?.map((ele: any, key: number) => {
                return (
                  <div className=" hover:bg-custom-100 hover:text-white">
                    <SelectItem value={ele} key={key}>
                      {ele}
                    </SelectItem>
                  </div>
                );
              })}
            </SelectContent>
          </Select>
        </FullFlex>
      )}
    </div>
  );
}
