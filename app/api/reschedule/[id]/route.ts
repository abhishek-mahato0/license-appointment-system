import dbconnect from "@/lib/dbConnect";
import { checkLogged } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { Appointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, {params}:any){
    try {
        await dbconnect();
        const {id} = params;
        if(!id) return ShowError(400, 'Invalid ID')
        const loggedUser = await checkLogged(req);
        
        const {medical, trial, written} =await req.json();
        if(!loggedUser) return ShowError(401, 'You are not authorized. Please login first.')
        const appointment = await Appointment.findOne({_id:id, status:'pending', user_id:loggedUser._id});
        if(!appointment) return ShowError(404, 'Appointment not found');
        const updatedMedical = await MedicalModal.findOneAndUpdate({_id:appointment?._id},medical);
        const updatedTrial = await MedicalModal.findOneAndUpdate({_id:appointment?._id},trial);
        const updatedWritten = await MedicalModal.findOneAndUpdate({_id:appointment?._id},written);
        if(updatedMedical && updatedTrial && updatedWritten){
            return NextResponse.json({
            message:'Rescheduled successfully',}, {status:200})
        }
        return ShowError(500, 'Failed to reschedule')
    } catch (error:any) {
        return ShowError(500, error?.message)
    }
}