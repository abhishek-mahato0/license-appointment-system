import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import { Appointment } from "@/models/appointmentsModel";
import { Payment } from "@/models/paymentModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const {app_id} = await req.json();
        if(!app_id) return ShowError(400,"Please provide all the required fields.")
        await dbconnect();
       const loggedUser = await checkAdmins(req);
       if(!loggedUser) return ShowError(401,"You are not authorized to make payment.");
        const appointment = await Appointment.findById(app_id);
        if(!appointment) return ShowError(404,"Appointment not found.")
        const payment = new Payment({
            user_id: appointment.user_id,
            appointment_id:app_id,
            amount:1000,
            payment_date:new Date(),
            payment_method:"Cash",
            payment_status:"completed",
            payment_gateway:"Cash",
            verifiedBy:loggedUser._id
        })
        await payment.save();
        appointment.payment = payment._id;
        await appointment.save();
        return NextResponse.json({message:"Payment successfull."}, {status:200})
        
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}

export async function GET(req: NextRequest){
    try {
        const from = req.nextUrl.searchParams.get("from");
        const to = req.nextUrl.searchParams.get("to");
        const status = req.nextUrl.searchParams.get("status");
        const gateway = req.nextUrl.searchParams.get("gateway");
        let query:any = {};
        if(from && !to ) query['payment_date'] = {$gte:new Date(from)} 
        if(!from && to) query['payment_date']={$lte:new Date(to)}
        if(from && to) query['payment_date'] = {$gte:new Date(from), $lte:new Date(to)}
        if(status) query['payment_status'] = status
        if(gateway) query['payment_gateway'] = gateway

        await dbconnect();
        const payments = await Payment.find(query).populate({
            path:'appointment_id',
            select:'tracking_id',
            model:Appointment
        }).populate({
            path:'verifiedBy',
            select:'name',
            model:Administrator
        });
        return NextResponse.json(payments, {status:200})
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}

export async function PATCH(req: NextRequest){
    try {
        const id = req.nextUrl.searchParams.get("id");
        const {status} = await req.json();
        if(!id || !status) return ShowError(400,"Please provide all the required fields.")
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if(!loggedUser) return ShowError(401,"You are not authorized to verify payment.");
        const payment = await Payment.findByIdAndUpdate(id,{
            payment_status:status,
            verifiedBy:loggedUser._id
        },{new:true});
        if(!payment) return ShowError(404,"Payment not found.")
        return NextResponse.json(payment, {status:200})
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}

export async function DELETE(req: NextRequest){
    try {
        const id = req.nextUrl.searchParams.get("id");
        if(!id) return ShowError(400,"Please provide all the required fields.")
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if(!loggedUser) return ShowError(401,"You are not authorized to verify payment.");
        const payment = await Payment.findByIdAndDelete(id);
        if(!payment) return ShowError(404,"Payment not found.")
        return NextResponse.json({message:"Payment deleted."}, {status:200})
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}