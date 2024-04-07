import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbconnect();
    const date = req.nextUrl.searchParams.get("date") || new Date();
    const category = req.nextUrl.searchParams.get("category") || "A";
    const office = req.nextUrl.searchParams.get("office");
    const query:any ={}
    if (category) query['category'] = category;
    if (office) query['office'] = office;
    if (date) query['date'] = convertDate(new Date(date));
    const trialCount = await TrailModal.countDocuments(query)
    const medicalCount = await MedicalModal.countDocuments(query)
    const writtenCount = await WrittenModal.countDocuments(query)
    return NextResponse.json({ Trial: trialCount, Medical: medicalCount, Written: writtenCount }, { status: 200 });
     
  } catch (error:any) {
      return ShowError(400, error.message);
  }
}