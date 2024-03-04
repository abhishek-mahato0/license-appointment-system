"use client";
import { useAppSelector } from "@/redux/TypedHooks";
import { setPendingAppointment } from "@/redux/slices/appointmentSlice";
import { apiinstance } from "@/services/Api";
import React, { useEffect } from "react";

export default function page({ params }: { params: any }) {
  const { pendingAppointment } = useAppSelector((state) => state.appointments);
  async function getAppointment() {
    const res = await apiinstance.get(`/admin/appointments/${params?.id}`);
    if (res.status === 200) {
      return setPendingAppointment(res.data);
    }
  }

  useEffect(() => {
    getAppointment();
  }, [pendingAppointment, params?.id]);
  return <div>{(params?.id, pendingAppointment.toString())}</div>;
}
