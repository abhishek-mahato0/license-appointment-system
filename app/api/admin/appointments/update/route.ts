import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";

import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await dbconnect();
        const date = req.nextUrl.searchParams.get('date');
        const category = req.nextUrl.searchParams.get('category');
        const office = req.nextUrl.searchParams.get('office');
        await dbconnect();
        const appointments = await MedicalModal.find({
                date: date || convertDate(new Date()),
                category: category || "A",
                office: office || "Bhaktapur"
        }).populate({
            path:"user_id",
            model:User
        });
        return NextResponse.json(appointments, { status: 200 }); 
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}


export async function PUT(req:NextRequest){
    try {
        await dbconnect();
        const type= req.nextUrl.searchParams.get('type');
        if(!type) return ShowError(400, "Type is required");
        const {id, status, app_id} = await req.json();
        if(!id || !status || app_id) return ShowError(400, "Id and status is required");
        if(status==="failed"){
            const appointment= await Appointment.findByIdAndUpdate(app_id, {status:"failed", hasApplied:false});
            const exists = await MedicalModal.findByIdAndUpdate(id, {status});
            const exists2 = await TrailModal.findByIdAndUpdate(id, {status});
            const exists3 = await WrittenModal.findByIdAndUpdate(id, {status});
            return NextResponse.json({message:"Exam updated successfully"}, {status:200});
        }
        if(type==="medical"){
         const exists = await MedicalModal.findByIdAndUpdate(id, {status});
         return NextResponse.json({message:"Medical exam updated successfully"}, {status:200});
        }
        else if(type==="trial"){
            const exists = await TrailModal.findByIdAndUpdate(id, {status});
            return NextResponse.json({message:"Trial exam updated successfully"}, {status:200});
        }else if(type==="written"){
            const exists = await WrittenModal.findByIdAndUpdate(id, {status});
            return NextResponse.json({message:"Written exam updated successfully"}, {status:200});
        }
        
            return ShowError(400, "Invalid type");
        
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}