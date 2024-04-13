"use client";

import Outline from "@/components/common/FormDetail/Outline";
import Loader from "@/components/common/Loader";
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
import { convertDate, getCustomDate } from "@/utils/convertDate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Tdata = {
  date: Date | undefined;
  shift: string;
};
export default function SelectDateAndTime() {
  const [loading, setLoading] = useState({
    medical: false,
    written: false,
    trial: false,
    submission: false,
  });
  const router = useRouter();
  const { data: session, update } = useSession();
  const { trialExamination, medicalExamination, writtenExamination } =
    useAppSelector((state) => state.applynew);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { selectedCat, selectedProv, selectedOffice } = useSelector(
    (state: any) => state.applynew
  );
  const [medical, setMedical] = useState<Tdata>({
    date: getCustomDate(7),
    shift: "morning",
  });
  const [written, setWritten] = useState<Tdata>({
    date: getCustomDate(8),
    shift: "morning",
  });
  const [trial, setTrial] = useState<Tdata>({
    date: getCustomDate(9),
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
    try {
      setLoading({ ...loading, medical: true });
      const res = await apiinstance.post("/apply/countoccupancy", {
        sdate: medical.date && convertDate(medical.date),
        category: selectedCat,
        office: selectedOffice,
        examtype: "medical",
        status: "pending",
      });
      if (res.status === 200) {
        return dispatch(setMedicalInfo(res.data));
      }
      return toast({
        title: "Error",
        description: res.data.message,
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    } finally {
      setLoading({ ...loading, medical: false });
    }
  };
  const fetchWrittenOccupancy = async () => {
    try {
      setLoading({ ...loading, written: true });
      const res = await apiinstance.post("/apply/countoccupancy", {
        sdate: written.date && convertDate(written.date),
        category: selectedCat,
        office: selectedOffice,
        examtype: "written",
        status: "pending",
      });
      if (res.status === 200) {
        return dispatch(setWrittenInfo(res.data));
      }
      return toast({
        title: "Error",
        description: res.data.message,
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    } finally {
      setLoading({ ...loading, written: false });
    }
  };
  const fetchTrialOccupancy = async () => {
    try {
      setLoading({ ...loading, trial: true });
      const res = await apiinstance.post("/apply/countoccupancy", {
        sdate: trial.date && convertDate(trial.date),
        category: selectedCat,
        office: selectedOffice,
        examtype: "trial",
        status: "pending",
      });
      if (res.status === 200) {
        return dispatch(setTrialInfo(res.data));
      }
      return toast({
        title: "Error",
        description: res.data.message,
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error occured",
      });
    } finally {
      setLoading({ ...loading, trial: false });
    }
  };

  async function applyForLicense() {
    try {
      const res = await apiinstance.post("/apply/new", {
        userId: session?.user?.id || "",
        selectedProv,
        selectedCat,
        selectedOffice,
        medicalExamination: {
          date: medical.date && convertDate(medical.date),
          shift: medical.shift,
          status: "pending",
        },
        writtenExamination: {
          date: written.date && convertDate(written.date),
          shift: written.shift,
          status: "pending",
        },
        trialExamination: {
          date: trial.date && convertDate(trial.date),
          shift: trial.shift,
          status: "pending",
        },
      });
      if (res.status === 201) {
        toast({
          title: "Success",
          description: "Applied for license successfully",
          variant: "success",
        });
        update({
          hasApplied: true,
        });
        return router.push(
          `/apply/payment?app_id=${res?.data?.appointment?._id as string}`
        );
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
    } finally {
      setLoading({ ...loading, submission: false });
    }
  }
  function checkOccupancy() {
    if (!medicalExamination || !writtenExamination || !trialExamination) {
      toast({
        title: "Error",
        description: "Please check the occupancy first",
        variant: "destructive",
      });
    } else {
      if (
        medicalExamination.filter((d) => d.shift === medical.shift)[0]?.count >
        1
      ) {
        toast({
          title: "Error",
          description: "Occupancy full for medical examination",
          variant: "destructive",
        });
      } else if (
        writtenExamination.filter((d) => d.shift === written.shift)[0]?.count >
        1
      ) {
        toast({
          title: "Error",
          description: "Occupancy full for written examination",
          variant: "destructive",
        });
      } else if (
        trialExamination.filter((d) => d.shift === trial.shift)[0]?.count > 1
      ) {
        toast({
          title: "Error",
          description: "Occupancy full for trial examination",
          variant: "destructive",
        });
      } else {
        applyForLicense();
      }
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
                  maxDate.setDate(currentDate.getDate() + 7);
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

            {medicalExamination && medicalExamination.length > 0 ? (
              medicalExamination.map((item: any, index) => (
                <p className=" text-sm" key={index}>
                  {item.shift}: {item.count}
                </p>
              ))
            ) : (
              <p>No occupancy on this day</p>
            )}

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
                  maxDate.setDate(currentDate.getDate() + 7);
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
            {writtenExamination && writtenExamination?.length > 0 ? (
              writtenExamination.map((item: any, index) => (
                <p className=" text-sm" key={index}>
                  {item.shift}: {item.count}
                </p>
              ))
            ) : (
              <p>No occupancy on this day</p>
            )}
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
                  maxDate.setDate(currentDate.getDate() + 10);
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
            {trialExamination && trialExamination.length > 0 ? (
              trialExamination.map((item: any, index) => (
                <p className=" text-sm" key={index}>
                  {item.shift}: {item.count}
                </p>
              ))
            ) : (
              <p>No occupancy on this day</p>
            )}
          </div>
        </div>
      </Outline>
      <div className=" flex w-full justify-end">
        <Button
          onClick={checkOccupancy}
          className=" w-16 float-right"
          disabled={loading.submission}
        >
          {loading.submission ? (
            <Loader
              color="#ffffff"
              height="20"
              width="20"
              radius="20"
              type="spinner"
            />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}
