import dbconnect from "@/lib/dbConnect";
import { checkLogin } from "@/lib/userAuth";
import { Appointment } from "@/models/appointmentsModel";
import { Payment } from "@/models/paymentModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {app_id, user_id, pidx} = await req.json();
        if(!app_id || !user_id || !pidx) return ShowError(400,"Please provide all the required fields.")
        await dbconnect();
      const loggedUser = await checkLogin(req);
        const appointment = await Appointment.findById(app_id);
        if(!appointment) return ShowError(404,"Appointment not found.")
        const payment = new Payment({
            user_id,
            appointment_id:app_id,
            amount:1000,
            payment_date:new Date(),
            payment_method:"Khalti",
            payment_status:"completed",
            payment_gateway:"Khalti",
        })
        await payment.save();
        appointment.payment = payment._id;
        await appointment.save();
        return NextResponse.json({message:"Payment successfull."}, {status:200})
    } catch (error:any) {
        return ShowError(500,error.message)
    }
}