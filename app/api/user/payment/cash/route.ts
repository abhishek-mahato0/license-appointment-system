import dbconnect from "@/lib/dbConnect";
import { checkLogin } from "@/lib/userAuth";
import { Appointment } from "@/models/appointmentsModel";
import { Payment } from "@/models/paymentModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {app_id, user_id} = await req.json();
        if(!app_id || !user_id) return ShowError(400,"Please provide all the required fields.")
        await dbconnect();
         const loggedUser = await checkLogin(req);
         if(!loggedUser) return ShowError(401,"You are not logged in.")
        const appointment = await Appointment.findById(app_id);
        if(!appointment) return ShowError(404,"Appointment not found.")
        const payment = new Payment({
            user_id,
            appointment_id:app_id,
            amount:0,
            payment_date:new Date(),
            payment_method:"Cash",
            payment_status:"pending",
            payment_gateway:"cash",
        })
        await payment.save();
        appointment.payment = payment._id;
        await appointment.save();
        return NextResponse.json({message:"Payment successfull."}, {status:200})
    } catch (error:any) {
        return ShowError(500,error.message)
    }
}