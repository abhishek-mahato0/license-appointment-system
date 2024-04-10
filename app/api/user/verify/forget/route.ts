import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import { forgetPasswordTemplate } from "@/utils/EmailTemplate";
import ShowError from "@/utils/ShowError";
import { generateOTP } from "@/utils/common";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const { email } = await req.json();
    if(!email){
        return ShowError(400,"Email is required");
    }
    const otp = generateOTP();
    const user = await User.findOneAndUpdate({ email }, { forgotPasswordtoken: otp });
    if (!user) {
      return ShowError(400, "User not found");
    }
    await sendCustomMail(email, "Reset Password token", "Reset Password", forgetPasswordTemplate({ token: otp, user: user.name }), "Message");
    return NextResponse.json({ message: "OTP sent. Please enter the otp." }, { status: 200 }); 
    }
    catch (error: any) {
    return ShowError(400, error?.message);
}
}