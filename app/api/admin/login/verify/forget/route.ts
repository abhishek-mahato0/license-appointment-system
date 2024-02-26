import dbconnect from "@/lib/dbConnect";
import { Administrator } from "@/models/AdministratorsModel";
import ShowError from "@/utils/ShowError";
import { generateOTP } from "@/utils/common";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await dbconnect();
    const { email } = await req.json();
    if(!email){
        return ShowError(400,"Email is required");
    }
    const otp = generateOTP();
    const user = await Administrator.findOneAndUpdate({ username:email }, { forgetPasswordToken: otp });
    if (!user) {
      return ShowError(400, "User not found");
    }
    // await sendCustomMail(email, "OTP sent to your email", "OTP for password reset" , `<h3>Your password reset otp for license appointment system, is <h2>${otp}</h2></h3>`,  "OTP sent to your email. Please enter the otp.");
    return NextResponse.json({ message: "OTP sent. Please enter the otp." }, { status: 200 }); 
    }
    catch (error: any) {
    return ShowError(400, error?.message);
}
}