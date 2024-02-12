import dbconnect from "@/lib/dbConnect";
import { Appointment, IAppointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

type TReq = {
  status: string;
  category: string;
  sdate: Date;
  office: string;
  examtype: string;
};
export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const { sdate, category, office, examtype, status }: TReq =
      await req.json();
    console.log(sdate, category, office, examtype);
    if (!sdate || !category || !examtype || !office || !status)
      return ShowError(400, "Invalid request. Insufficient data provided");
    const endDate = new Date(sdate);
    const res = await switchType(
      category,
      office,
      examtype,
      sdate,
      status
    );
    return res;
  } catch (error: any) {
    return ShowError(400, error.message);
  }
}
export async function switchType(
  category: string,
  office: string,
  type: string,
  sdate: Date,
  status: string
) {
  if (type === "trial") {
    const apppointment = await Appointment.find({
      category: category,
      office: office,
      status: status,
      trial: {
        $elemMatch: {
          date: sdate,
          status: "pending",
        },
      },
    });
    const newArr = Object.entries(
      apppointment
        .map(
          (item) =>
            item.trial.filter(
              (ele: any) => ele.date == sdate && ele.status === "pending"
            )[0]
        )
        ?.reduce((acc, curr) => {
          acc[curr.shift] = (acc[curr.shift] || 0) + 1;
          return acc;
        }, {})
    ).map(([shift, count]) => ({ shift, count }));
    return NextResponse.json(newArr, { status: 200 });
  } else if (type === "written") {
    const apppointment = await Appointment.find({
      category: category,
      office: office,
      status: status,
      written: {
        $elemMatch: {
          date: sdate,
          status: "pending",
        },
      },
    });
    const newArr = Object.entries(
      apppointment
        .map(
          (item) =>
            item.written.filter(
              (ele: any) => ele.date == sdate && ele.status === "pending"
            )[0]
        )
        ?.reduce((acc, curr) => {
          acc[curr.shift] = (acc[curr.shift] || 0) + 1;
          return acc;
        }, {})
    ).map(([shift, count]) => ({ shift, count }));
    return NextResponse.json(newArr, { status: 200 });
  } else {
    const apppointment = await Appointment.find({
      category: category,
      office: office,
      status: status,
      medical: {
        $elemMatch: {
          date: sdate,
          status: "pending",
        },
      },
    });
    const newArr = Object.entries(
      apppointment
        .map(
          (item) =>
            item.medical.filter(
              (ele: any) => ele.date == sdate && ele.status === "pending"
            )[0]
        )
        ?.reduce((acc, curr) => {
          acc[curr.shift] = (acc[curr.shift] || 0) + 1;
          return acc;
        }, {})
    ).map(([shift, count]) => ({ shift, count }));
    return NextResponse.json(newArr, { status: 200 });
  }
}
