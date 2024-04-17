import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";
async function switchType(
  category: string,
  office: string,
  type: string,
  sdate: Date,
  status: string
) {
  if (type === "trial") {
    const apppointment = await TrailModal.find({
      category: category,
      office: office,
      status: status,
      date:sdate
    });
    const newArr = Object.entries(
      apppointment?.reduce((acc, curr) => {
          acc[curr.shift] = (acc[curr.shift] || 0) + 1;
          return acc;
        }, {})
    ).map(([shift, count]) => ({ shift, count }));
    return NextResponse.json(newArr, { status: 200 });
  } else if (type === "written") {
    const apppointment = await WrittenModal.find({
      category: category,
      office: office,
      status: status,
     date:sdate
    });
    const newArr = Object.entries(
      apppointment?.reduce((acc, curr) => {
          acc[curr.shift] = (acc[curr.shift] || 0) + 1;
          return acc;
        }, {})
    ).map(([shift, count]) => ({ shift, count }));
    return NextResponse.json(newArr, { status: 200 });
  } else {
    const apppointment = await MedicalModal.find({
      category: category,
      office: office,
      status: status,
      date:sdate
    });
    const newArr = Object.entries(
      apppointment?.reduce((acc, curr) => {
          acc[curr.shift] = (acc[curr.shift] || 0) + 1;
          return acc;
        }, {})
    ).map(([shift, count]) => ({ shift, count }));
    return NextResponse.json(newArr, { status: 200 });
  }
}


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
