
import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if (!loggedUser) {
            return ShowError(400, "You are not authorized to perform this action");
        }
        const shift = req.nextUrl.searchParams.get("shift");
        const from = req.nextUrl.searchParams.get("from");
        const to = req.nextUrl.searchParams.get("to");
        const query:any={}
        if(shift) query['shift'] = shift;
        if(from && to) query['date'] = {$gte: new Date(from), $lte:new Date(to)}
        if(!from && to) query['date'] = {$lte:new Date(to)}
        if(from && !to) query['date'] = {$gte:new Date(from)}
        const medicalCount = await MedicalModal.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    name: { $first: "$status" }
               
                }
            }
        ]);
        const writtenCount = await WrittenModal.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    name: { $first: "$status" }
               
                }
            }
        ]);
        const trialCount = await TrailModal.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    name: { $first: "$status"}
                   
                }
            }
        ]);

        return NextResponse.json({
            medical:medicalCount,
            written:writtenCount,
            trial:trialCount
    }, { status: 200 });
    } catch (error: any) {
        return ShowError(500, error?.message || "Internal Server Error");
    }
}
