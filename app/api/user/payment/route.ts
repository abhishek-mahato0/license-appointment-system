import dbconnect from "@/lib/dbConnect";
import { checkLogin } from "@/lib/userAuth";
import { Appointment } from "@/models/appointmentsModel";
import { Payment } from "@/models/paymentModel";
import { User } from "@/models/userModel";
import { apiinstance } from "@/services/Api";
import { paymentSuccessTemplate } from "@/utils/EmailTemplate";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest) {
//     try {
//         await dbconnect();
//         const pidx = req.nextUrl.searchParams.get("pidx");
//         const app_id= req.nextUrl.searchParams.get("purchase_order_id");
//         const user_id= req.nextUrl.searchParams.get("purchase_order_name");
//         if(!app_id || !user_id || !pidx) return ShowError(400,"Please provide all the required fields.")
//         const {data} = await apiinstance.post(
//             "https://a.khalti.com/api/v2/epayment/lookup/",
//             {
//               pidx: pidx,
//             },
//             {
//                 headers: {
//                   "Authorization": "key a558b8820fa84abca6fd20cf6c51a0f0",
//                   "Content-Type": "application/json",
//                 },
//               }
//           );
//           if (data?.status !== "Completed") {
//             return NextResponse.redirect("/appointments")
//           }

//           const appointment = await Appointment.findById(app_id);
        
//           if(!appointment) return ShowError(404,"Appointment not found.")
//           const payment = new Payment({
//               user_id,
//               appointment_id:app_id,
//               amount:1000,
//               payment_date:new Date(),
//               payment_method:"Khalti",
//               payment_status:"completed",
//               payment_gateway:"Khalti",
//           })
//           await payment.save();
//           appointment.payment = payment._id;
//           await appointment.save();
//         return NextResponse.json({message:"Payment successfull."}, {status:200})
//     } catch (error:any) {
//         console.log(error)
//         return ShowError(500,error.message)
//     }
// }


export async function POST(req: NextRequest) {
    try {
        const {app_id, user_id, pidx} = await req.json();
        if(!app_id || !user_id || !pidx) return ShowError(400,"Please provide all the required fields.");
        console.log(app_id, user_id, pidx)
        await dbconnect();
        const appointment = await Appointment.findById(app_id);
        if(!appointment) return ShowError(404,"Appointment not found.")
        const user = await User.findById(user_id);
        if(!user) return ShowError(404,"User not found.");

        const {data} = await apiinstance.post(
          "https://a.khalti.com/api/v2/epayment/lookup/",
          {
            pidx: pidx,
          },
          {
              headers: {
                "Authorization": `key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            }
        );
        console.log(data)
        if (data?.status !== "Completed") {
          return NextResponse.json({message:"Payment Failed"}, { status: 400 });
        }
        const payment = new Payment({
            user_id,
            appointment_id:app_id,
            amount:1000,
            payment_date:new Date(),
            payment_method:"Khalti",
            payment_status:"completed",
            payment_gateway:"Khalti",
        })
        console.log(payment)
        await payment.save();
        appointment.payment = payment._id;
        await appointment.save();
        await sendCustomMail(user?.email, "Payment Successfull", "Your payment has been successfull. Thank you for using our service.", paymentSuccessTemplate(user?.name), "Message")
        return NextResponse.json({message:"Payment successfull."}, {status:200})
    } catch (error:any) {
        console.log(error)
        return ShowError(500,error.message)
    }
}