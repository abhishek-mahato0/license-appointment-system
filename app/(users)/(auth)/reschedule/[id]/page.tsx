"use client";
import HeaderTitle from "@/components/common/HeaderTitle";
import SelectDateAndTime from "@/components/reschedule/SelectDateAndTime";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { setPendingAppointment } from "@/redux/slices/appointmentSlice";
import { apiinstance } from "@/services/Api";
import React, { useEffect } from "react";

export default function page({ params }: { params: any }) {
  const { pendingAppointment } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();
  async function getAppointment() {
    const res = await apiinstance.get(`/admin/appointments/${params?.id}`);
    if (res.status === 200) {
      return dispatch(setPendingAppointment(res?.data));
    }
  }

  useEffect(() => {
    getAppointment();
  }, [params?.id]);
  return (
    <div className=" w-full items-center justify-center flex flex-col mt-5">
      <HeaderTitle title="Reschedule Appointment" />
      <div className=" w-full flex flex-col items-center justify-center">
        <div className=" w-[98%] p-3 flex flex-col bg-custom-50">
          <div className=" w-full flex flex-col justify-start items-start pl-3">
            <p className=" font-bold">
              Selected Category: {pendingAppointment?.category}
            </p>
          </div>
          {pendingAppointment && (
            <SelectDateAndTime
              info={{
                app_id: pendingAppointment?._id,
                selectedCat: pendingAppointment?.category,
                selectedOffice: pendingAppointment?.office,
                medical: pendingAppointment?.medical,
                trial: pendingAppointment?.trial,
                written: pendingAppointment?.written,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
