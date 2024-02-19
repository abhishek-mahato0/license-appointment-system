import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbconnect();
    const category = req.nextUrl.searchParams.get("category");
    const office = req.nextUrl.searchParams.get("office");
    const date = req.nextUrl.searchParams.get("date");
    const counts = await TrailModal.aggregate([
      {
        $match: {
          category: category ? category : "A",
          office: office ? office : { $eq: "Bhaktapur" },
          date: date ? date : convertDate(new Date()),
        },
      },
      {
        $group: {
          _id: { name: "$shift", status: "$status" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.name",
          name: { $first: "$_id.name" },
          data: {
            $push: {
              k: "$_id.status",
              v: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$name",
          data: { $arrayToObject: "$data" },
        },
      },
    ]);
    let shifts = ["morning", "afternoon", "evening"];
    if (counts.length > 0) {
      const newData = counts.map((item: any) => {
        return {
          name: item.name,
          failed: item.data.failed || 0,
          pending: item.data.pending || 0,
          completed: item.data.completed || 0,
        };
      });
      shifts.forEach(shift => {
        const existingShift = newData.find(item => item.name === shift);
        if (!existingShift) {
          const missingShift = {
            name: shift,
            failed: 0,
            pending: 0,
            completed: 0
          };
          newData.push(missingShift);
        }
      });
      
      return NextResponse.json(newData, { status: 200 });
    }
    const defaultData=[
        {
          "name": "morning",
          "failed": 0,
          "pending": 0,
          "completed": 0
        },
        {
          "name": "evening",
          "failed": 0,
          "pending": 0,
          "completed": 0
        },
        {
          "name": "afternoon",
          "failed": 0,
          "pending": 0,
          "completed": 0
        }
      ]
    return NextResponse.json( defaultData, { status: 200 })
  
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}
