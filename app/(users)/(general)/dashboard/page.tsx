"use client";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { categoryData } from "@/components/data/CategoryData";
import React, { useEffect, useMemo, useState } from "react";
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
import HeaderTitle from "@/components/common/HeaderTitle";
import { getAllOffices } from "@/utils/officeInfo";

export default function page() {
  const [offices, setOffices] = useState<any>([]);
  async function getOfficeList() {
    const { success, data, error } = await getAllOffices();
    if (success) {
      return setOffices(
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
    return setOffices([]);
  }
  useMemo(() => {
    getOfficeList();
  }, []);

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
    offices && offices[0]?.value
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
  const [officename, setOfficename] = useState<any>(null);
  useEffect(() => {
    offices &&
      setOfficename(
        offices.find((ele: any) => ele.value === selectedOffice)?.name
      );
  }, [selectedOffice]);

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
    <div className=" flex flex-col w-full items-start justify-start mt-3">
      <div className=" w-full justify-between items-center flex pr-6">
        <HeaderTitle title="Public Dashboard" />
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
          Total Occupancy of category {selectedCat} in{" "}
          {officename ? officename : "All Offices"}
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
