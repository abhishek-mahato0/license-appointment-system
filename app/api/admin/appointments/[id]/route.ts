import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await dbconnect();
        const appointment = await Appointment.findById(id).populate({
            path:'medical',
            model:MedicalModal
        }).populate({
            path:'trial',
            model:TrailModal
        }).populate({
            path:'written',
            model:WrittenModal
        })
        return NextResponse.json(appointment, { status: 200 })
        
    } catch (error:any) {
        return ShowError(500, error.message)
    }

}