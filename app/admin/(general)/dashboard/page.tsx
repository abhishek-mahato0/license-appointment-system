"use client";
import AdminBarChart from "@/components/common/AdminChart/BarChart";
import ChartCard from "@/components/common/AdminChart/ChartCard";
import DashboardCard from "@/components/common/dashboard/Card";
import HeaderTitle from "@/components/common/HeaderTitle";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import CustomPieChart from "@/components/recharts/PieChart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAdmins,
  fetchAppointments,
  fetchCategory,
  fetchDocuments,
  fetchTotalCounts,
  fetchUsers,
} from "@/redux/slices/adminDashboard";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { capitalizeFirstLetter } from "@/utils/convertDate";
import { BookDown, BookOpen, ListChecks, User, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePDF } from "react-to-pdf";

export default function page() {
  const [province, setProvince] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "dashboard.pdf" });
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const dispatch = useAppDispatch();
  const { admins, appointments, category, documents, users, totalCounts } =
    useAppSelector((state) => state.adminDashboard);
  useEffect(() => {
    dispatch(
      fetchTotalCounts({
        province: province,
        from: from,
        to: to,
      })
    );
    dispatch(
      fetchAppointments({
        province: province,
        from: from,
        to: to,
      })
    );

    dispatch(
      fetchDocuments({
        province: province,
        from: from,
        to: to,
      })
    );

    dispatch(
      fetchUsers({
        province: province,
        from: from,
        to: to,
      })
    );

    dispatch(
      fetchCategory({
        province: province,
        from: from,
        to: to,
      })
    );
    dispatch(
      fetchAdmins({
        province: province,
        from: from,
        to: to,
      })
    );
  }, [from, to, province]);
  return (
    <div className=" flex w-full flex-col px-3 mt-2" ref={targetRef}>
      <div className=" flex items-center justify-between w-full">
        <HeaderTitle title="Admin Dashboard" />
        <div className="flex items-center justify-center gap-5 py-2 px-3">
          <SingleSelect
            data={[
              {
                id: 1,
                name: "Province 1",
                value: "1",
              },
              {
                id: 2,
                name: "Province 2",
                value: "2",
              },
              {
                id: 3,
                name: "Province 3",
                value: "3",
              },
              {
                id: 4,
                name: "Province 4",
                value: "4",
              },
              {
                id: 5,
                name: "Province 5",
                value: "5",
              },
              {
                id: 6,
                name: "Province 6",
                value: "6",
              },
              {
                id: 7,
                name: "Province 7",
                value: "7",
              },
            ]}
            value={province}
            placeholder="Select Province"
            classNames=" outline-none border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 min-w-[220px]"
            onSelect={(value: any) => {
              setProvince(value);
            }}
          />
          <div className=" flex items-center justify-center gap-2">
            <input
              type="date"
              className=" border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 outline-none"
              onChange={(e) => setFrom(e.target.value)}
            />
            <p>to</p>
            <input
              type="date"
              className=" border-b-2 border-x-[0px] border-t-[0px] hover:border-custom-100 border-customtext-100 outline-none"
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className=" border-red-500 hover:text-red-500"
            onClick={() => {
              setProvince("");
              setFrom("");
              setTo("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className=" mt-4 mb-2 flex items-center justify-between font-bold">
        <h2>
          Showing results of {province === "" && "all"} Province{" "}
          {province != "" && province}{" "}
          {from === "" && to === "" && "all dates."}
          {from !== "" && to === "" && `from ${from} to present.`}
          {from === "" && to !== "" && `upto ${to}.`}
          {from !== "" && to !== "" && `from ${from} to ${to}.`}
        </h2>
        <Button onClick={() => toPDF()}>Export as PDF</Button>
      </div>
      <div className=" w-full flex mt-3 flex-col lg:flex-row justify-between items-center px-3 gap-2">
        {totalCounts.loading ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className=" h-[100px] w-[190px] rounded-lg" />
            ))}
          </>
        ) : (
          Object.keys(totalCounts.data).map((ele: any) => {
            return (
              <DashboardCard
                key={ele}
                title={capitalizeFirstLetter(ele)}
                count={totalCounts?.data[ele]}
              >
                {ele === "Users" ? (
                  <Users strokeWidth={2} size={40} width={40} />
                ) : ele === "Appointments" ? (
                  <BookDown strokeWidth={2} size={40} width={40} />
                ) : ele === "Offices" ? (
                  <ListChecks strokeWidth={2} size={40} width={40} />
                ) : ele === "Question" ? (
                  <BookOpen strokeWidth={2} size={40} width={40} />
                ) : ele === "Admins" ? (
                  <User strokeWidth={2} size={40} width={40} />
                ) : null}
              </DashboardCard>
            );
          })
        )}
      </div>
      <div className=" grid lg:grid-cols-2 grid-cols-1 mt-5 space-x-4 gap-3 w-full pr-6">
        <ChartCard title="Counts of Admin and Editor" data={admins}>
          <CustomPieChart data={admins.data} />
        </ChartCard>
        <ChartCard title="Appointments according to status" data={appointments}>
          <AdminBarChart data={appointments.data} />
        </ChartCard>
        <ChartCard title="Categorywise Appointments" data={category}>
          <AdminBarChart data={category.data} />
        </ChartCard>
        <ChartCard title="Document according to status" data={users}>
          <CustomPieChart data={users.data} />
        </ChartCard>
      </div>
      <div className=" w-full flex flex-col items-start justify-start gap-4 mt-6 pl-3">
        <h3 className=" text-custom-100 font-normal text-xl">
          Examination status.
        </h3>
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 w-full">
          <ChartCard title="Medical status" data={documents}>
            <AdminBarChart data={documents.data.medical} />
          </ChartCard>
          <ChartCard title="Written status" data={documents}>
            <AdminBarChart data={documents.data.written} />
          </ChartCard>
          <ChartCard title="Trail status" data={documents}>
            <AdminBarChart data={documents.data.trial} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
