"use client";
import { customStyles } from "@/components/common/MultiselectStyles";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import Select from "react-select";
import { categoryData } from "@/components/data/CategoryData";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  fetchDashboardCounts,
  fetchDashboardMedicalData,
  fetchDashboardTrialData,
  fetchDashboardWrittenData,
} from "@/utils/dashboard";
import {
  setMedical,
  setTotalCount,
  setTrial,
  setWritten,
} from "@/redux/slices/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import CustomBarChart from "@/components/recharts/BarChart";
import DashboardCard from "@/components/common/dashboard/Card";
import { useSelector } from "react-redux";
import { Book, Car, HeartPulse, TimerIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ChartCard from "@/components/recharts/ChartCard";

let offices = [
  {
    id: 1,
    name: "RTO Office",
    value: "RTO",
  },
  {
    id: 2,
    name: "RTO Office",
    value: "RTOs",
  },
  {
    id: 3,
    name: "Lahan",
    value: "Lahan",
  },
  {
    id: 4,
    name: "Kathmandu",
    value: "Kathmandu",
  },
  {
    id: 5,
    name: "Bhaktapur",
    value: "Bhaktapur",
  },
  {
    id: 6,
    name: "Lalitpur",
    value: "Lalitpur",
  },
];

export default function page() {
  const currentTime = new Date().getHours();
  const shift =
    currentTime >= 10 && currentTime <= 12
      ? "Morning"
      : currentTime === 13
      ? "Break"
        ? currentTime <= 14 && currentTime > 13
          ? "Afternoon"
          : currentTime >= 14 && currentTime <= 17
        : "Evening"
      : "Not Open";
  const category = useSearchParams().get("category");
  const office = useSearchParams().get("office");
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState<any>(category || "A");
  const [selectedOffice, setSelectedOffice] = useState<any>(
    office || "Bhaktapur"
  );
  const dispatch = useAppDispatch();
  const { trial, totalCount, written, medical } = useSelector(
    (state: any) => state.dashboard
  );
  const fetchCounts = async () => {
    const { data, success } = await fetchDashboardCounts(
      selectedCat,
      selectedOffice
    );
    if (success) {
      dispatch(setTotalCount(data));
    }
  };
  const fetchTrialChartData = async () => {
    const { data, success } = await fetchDashboardTrialData(
      selectedCat,
      selectedOffice
    );
    if (success) {
      dispatch(setTrial(data));
    }
  };

  const fetchMedicalChartData = async () => {
    const { data, success } = await fetchDashboardMedicalData(
      selectedCat,
      selectedOffice
    );
    if (success) {
      dispatch(setMedical(data));
    }
  };

  const fetchWrittenChartData = async () => {
    const { data, success } = await fetchDashboardWrittenData(
      selectedCat,
      selectedOffice
    );
    if (success) {
      dispatch(setWritten(data));
    }
  };
  useEffect(() => {
    fetchCounts();
    fetchTrialChartData();
    fetchMedicalChartData();
    fetchWrittenChartData();
  }, [selectedOffice, selectedCat, dispatch]);

  return (
    <div className=" flex flex-col w-full items-start justify-start mt-5">
      <div className=" w-full justify-between items-center flex pr-6 ">
        <h1 className=" font-bold text-custom-150 text-2xl">
          Public Dashboard
        </h1>
        <div className="flex items-center justify-center gap-5">
          <SingleSelect
            data={categoryData.map((ele) => ({
              id: ele.id,
              name: ele.name,
              value: ele.category,
            }))}
            value={selectedCat}
            placeholder="Select Category"
            classNames=" outline-none border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 min-w-[220px]"
            onSelect={(value: any) => {
              setSelectedCat(value);
              router.push(`?category=${value}&office=${selectedOffice}`);
            }}
          />
          <SingleSelect
            data={offices}
            value={selectedOffice}
            classNames=" outline-none border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 min-w-[160px]"
            onSelect={(value: any) => {
              setSelectedOffice(value);
              router.push(`?category=${selectedCat}&office=${value}`);
            }}
            placeholder="Select Office"
          />
        </div>
      </div>
      <div className=" w-full flex gap-2 p-4 mt-4 mb-6 justify-between">
        <DashboardCard title="Current Shift" count={shift}>
          <TimerIcon size={40} />
        </DashboardCard>
        {totalCount &&
          Object.keys(totalCount).map((key) => {
            return (
              <DashboardCard title={key} count={totalCount[key]}>
                {key === "Trial" ? (
                  <Car size={40} />
                ) : key === "Medical" ? (
                  <HeartPulse size={40} />
                ) : (
                  <Book size={40} />
                )}
              </DashboardCard>
            );
          })}
      </div>
      <div className=" w-full flex flex-col items-start justify-start gap-4">
        <h1 className=" mb-2 text-xl font-medium">
          Total Occupancy of category {selectedCat} in {selectedOffice}
        </h1>
        <div className=" grid grid-cols-3 w-full gap-x-3 gap-y-6"></div>
        <div className=" grid grid-cols-2 w-full gap-x-3 gap-y-10">
          {medical && (
            <ChartCard title="Medical">
              <CustomBarChart
                data={medical}
                keys={["pending", "failed", "completed"]}
              />
            </ChartCard>
          )}
          {written && (
            <ChartCard title="Written">
              <CustomBarChart
                data={written}
                keys={["pending", "failed", "completed"]}
              />
            </ChartCard>
          )}
          {trial && (
            <ChartCard title="Trial">
              <CustomBarChart
                data={trial}
                keys={["pending", "failed", "completed"]}
              />
            </ChartCard>
          )}
        </div>
      </div>
    </div>
  );
}
