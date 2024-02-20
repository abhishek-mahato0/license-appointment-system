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
    const date = req.nextUrl.searchParams.get("date");
    const category = req.nextUrl.searchParams.get("category");
    const office = req.nextUrl.searchParams.get("office");
    const trialCount = await TrailModal.countDocuments(
        {
            category: category ? category : "A",
            office: office ? office : { $eq: "Bhaktapur" },
            date: date ? date : convertDate(new Date()),
        },

        )
    const medicalCount = await MedicalModal.countDocuments({
        date: date? date: convertDate(new Date()),
        category: category ? category : "A",
        office: office ? office : "Bhaktapur",
        
    })
    const writtenCount = await WrittenModal.countDocuments({
    
        date: date? date: convertDate(new Date()),
        category: category ? category : "A",
        office: office ? office : "Bhaktapur",
        
    })
    return NextResponse.json({ Trial: trialCount, Medical: medicalCount, Written: writtenCount }, { status: 200 });
     
  } catch (error:any) {
      return ShowError(400, error.message);
  }
}