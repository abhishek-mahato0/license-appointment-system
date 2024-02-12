"use client";

import Outline from "@/components/common/FormDetail/Outline";
import { DatePicker } from "@/components/common/SelectDate";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import {
  setMedicalInfo,
  setTrialInfo,
  setWrittenInfo,
} from "@/redux/slices/applynewSlice";
import { apiinstance } from "@/services/Api";
import React, { useState } from "react";

type Tdata = {
  date: Date | undefined;
  shift: string;
};
export default function SelectDateAndTime() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { selectedCat, selectedProv, selectedOffice } = useAppSelector(
    (state) => state.applynew
  );
  const [medical, setMedical] = useState<Tdata>({
    date: new Date(),
    shift: "morning",
  });
  const [written, setWritten] = useState<Tdata>({
    date: new Date(),
    shift: "morning",
  });
  const [trial, setTrial] = useState<Tdata>({
    date: new Date(),
    shift: "morning",
  });

  let options = [
    {
      id: 1,
      name: "Morning",
      value: "morning",
    },
    {
      id: 2,
      name: "Afternoon",
      value: "afternoon",
    },
    {
      id: 3,
      name: "Evening",
      value: "evening",
    },
  ];
  const fetchMedicalOccupancy = async () => {
    dispatch(setMedicalInfo(medical));
  };
  const fetchWrittenOccupancy = async () => {
    dispatch(setWrittenInfo(written));
  };
  const fetchTrialOccupancy = async () => {
    dispatch(setTrialInfo(trial));
  };

  async function applyForLicense() {
    try {
      const res = await apiinstance.post("apply/new", {
        selectedCat,
        selectedProv,
        selectedOffice,
        medicalExamination: { date: medical.date, shift: medical.shift },
        writtenExamination: { date: written.date, shift: written.shift },
        trialExamination: { date: trial.date, shift: trial.shift },
      });
      if (res.status === 201) {
        toast({
          title: "Success",
          description: "Applied for license successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    }
  }
  function checkOccupancy() {
    let data = [
      {
        date: new Date(),
        shift: "morning",
        count: 12,
      },
      {
        date: new Date(),
        shift: "afternoon",
        count: 14,
      },
      {
        date: new Date(),
        shift: "evening",
        count: 9,
      },
    ];
    if (data.filter((d) => d.shift === medical.shift)[0].count > 10) {
      alert("Occupancy full for medical examination");
    } else if (data.filter((d) => d.shift === written.shift)[0].count > 10) {
      alert("Occupancy full for written examination");
    } else if (data.filter((d) => d.shift === trial.shift)[0].count > 10) {
      alert("Occupancy full for trial examination");
    } else {
      applyForLicense();
    }
  }
  return (
    <div className="flex w-[100%] flex-col mt-10 gap-10">
      <Outline title="Select Date and Time for Medical Examination">
        <div className=" w-full flex items-center justify-center gap-3">
          <div className=" w-[55%] flex flex-col items-start justify-start gap-2">
            <div className=" w-full flex items-center mt-2 gap-3">
              <p className=" font-bold border-customtext py-1 px-2 border-[1.5px] text-sm ">
                Selected Date:{" "}
                {medical?.date && (
                  <span className=" text-xs font-normal pl-1">
                    {medical.date.toDateString()}
                  </span>
                )}
              </p>
              <p className=" font-bold border-customtext py-1 px-2 border-[1.5px] text-sm">
                Selected Shift:{" "}
                <span className=" text-xs font-normal pl-1">
                  {medical.shift}
                </span>
              </p>
            </div>
            <div className="w-full flex items-center gap-3 mt-2 ">
              <DatePicker
                date={medical?.date}
                setDate={(val: Date | undefined) =>
                  setMedical({ ...medical, date: val })
                }
                placeholder="Select Date"
                classNames=" z-30 bg-white"
                disabled={(date: Date) => {
                  const currentDate = new Date();
                  const maxDate = new Date();
                  maxDate.setDate(currentDate.getDate() + 10);
                  return date < maxDate;
                }}
              />
              <SingleSelect
                onSelect={(val: any) => setMedical({ ...medical, shift: val })}
                data={options}
                placeholder="Select Shift"
                classNames=" w-[130px]"
              />
            </div>
            <div className=" w-full flex items-center justify-start gap-3">
              <Button onClick={fetchMedicalOccupancy}>Submit</Button>
              <span className=" text-xs text-red-500">
                Note: Click submit to see the number of occupancy for medical
                examination.
              </span>
            </div>
          </div>
          <div className="w-[45%] flex flex-col px-2 py-1 bg-custom-100 text-white rounded-lg ">
            <h2 className=" font-bold text-gray-300 border-b-[1.5px] mb-2">
              Medical Examinees for category A
            </h2>
            <p className=" text-sm">Morning: 20</p>
            <p className=" text-sm">Afternoon: 20</p>
            <p className=" text-sm">Morning: 20</p>
            <span className=" text-customtext-100 text-xs">
              Note: Maximun number of examinee for a shift is 20
            </span>
          </div>
        </div>
      </Outline>
      <Outline title="Select Date and Time for Written Examination">
        <div className=" w-full flex items-center justify-center gap-3">
          <div className=" w-[55%] flex flex-col items-start justify-start gap-2">
            <div className=" w-full flex items-center mt-2 gap-3">
              <p className=" font-bold border-customtext py-1 px-2 border-[1.5px] text-sm ">
                Selected Date:{" "}
                {written?.date && (
                  <span className=" text-xs font-normal pl-1">
                    {written.date.toDateString()}
                  </span>
                )}
              </p>
              <p className=" font-bold border-customtext py-1 px-2 border-[1.5px] text-sm">
                Selected Shift:{" "}
                <span className=" text-xs font-normal pl-1">
                  {written.shift}
                </span>
              </p>
            </div>
            <div className="w-full flex items-center gap-3 mt-2 ">
              <DatePicker
                date={written?.date}
                setDate={(val: Date | undefined) =>
                  setWritten({ ...written, date: val })
                }
                placeholder="Select Date"
                classNames=" z-30 bg-white"
                disabled={(date: Date) => {
                  const currentDate = new Date(medical.date || new Date());
                  currentDate.setDate(currentDate.getDate() + 1);
                  const maxDate = new Date();
                  maxDate.setDate(currentDate.getDate() + 15);
                  return date < currentDate || date > maxDate;
                }}
              />
              <SingleSelect
                onSelect={(val: any) => setWritten({ ...written, shift: val })}
                data={options}
                placeholder="Select Shift"
                classNames=" w-[130px]"
              />
            </div>
            <div className=" w-full flex items-center justify-start gap-3">
              <Button onClick={fetchWrittenOccupancy}>Submit</Button>
              <span className=" text-xs text-red-500">
                Note: Click submit to see the number of occupancy for written
                examination.
              </span>
            </div>
          </div>
          <div className="w-[45%] flex flex-col px-2 py-1 bg-custom-100 text-white rounded-lg ">
            <h2 className=" font-bold text-gray-300 border-b-[1.5px] mb-2">
              Written Examinees for category A
            </h2>
            <p className=" text-sm">Morning: 20</p>
            <p className=" text-sm">Afternoon: 20</p>
            <p className=" text-sm">Morning: 20</p>
            <span className=" text-customtext-100 text-xs">
              Note: Maximun number of examinee for a shift is 20
            </span>
          </div>
        </div>
      </Outline>
      <Outline title="Select Date and Time for Trial Examination">
        <div className=" w-full flex items-center justify-center gap-3">
          <div className=" w-[55%] flex flex-col items-start justify-start gap-2">
            <div className=" w-full flex items-center mt-2 gap-3">
              <p className=" font-bold border-customtext py-1 px-2 border-[1.5px] text-sm ">
                Selected Date:{" "}
                {trial?.date && (
                  <span className=" text-xs font-normal pl-1">
                    {trial.date.toDateString()}
                  </span>
                )}
              </p>
              <p className=" font-bold border-customtext py-1 px-2 border-[1.5px] text-sm">
                Selected Shift:{" "}
                <span className=" text-xs font-normal pl-1">{trial.shift}</span>
              </p>
            </div>
            <div className="w-full flex items-center gap-3 mt-2 ">
              <DatePicker
                date={trial?.date}
                setDate={(val: Date | undefined) =>
                  setTrial({ ...trial, date: val })
                }
                placeholder="Select Date"
                classNames=" z-30 bg-white"
                disabled={(date: Date) => {
                  const currentDate = new Date(written.date || new Date());
                  currentDate.setDate(currentDate.getDate() + 2);
                  const maxDate = new Date();
                  maxDate.setDate(currentDate.getDate() + 20);
                  return date < currentDate || date > maxDate;
                }}
              />
              <SingleSelect
                onSelect={(val: any) => setTrial({ ...trial, shift: val })}
                data={options}
                placeholder="Select Shift"
                classNames=" w-[130px]"
              />
            </div>
            <div className=" w-full flex items-center justify-start gap-3">
              <Button onClick={fetchTrialOccupancy}>Submit</Button>
              <span className=" text-xs text-red-500">
                Note: Click submit to see the number of occupancy for Trial
                examination.
              </span>
            </div>
          </div>
          <div className="w-[45%] flex flex-col px-2 py-1 bg-custom-100 text-white rounded-lg ">
            <h2 className=" font-bold text-gray-300 border-b-[1.5px] mb-2">
              Trial Examinees for category A
            </h2>
            <p className=" text-sm">Morning: 20</p>
            <p className=" text-sm">Afternoon: 20</p>
            <p className=" text-sm">Morning: 20</p>
            <span className=" text-customtext-100 text-xs">
              Note: Maximun number of examinee for a shift is 20
            </span>
          </div>
        </div>
      </Outline>
      <button onClick={checkOccupancy}>Save</button>
    </div>
  );
}
