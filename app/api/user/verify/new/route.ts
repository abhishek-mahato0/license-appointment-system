import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
    try {
        const email= req.nextUrl.searchParams.get("email");
        const otp = req.nextUrl.searchParams.get("otp");
       const password = await req.json();
        if(!email || !otp || !password){
            return ShowError(400,"Email and otp is required");
        }
        const newpassword = bcrypt.hashSync(password?.password, 10);
        const user = await User.findOneAndUpdate({ email, forgotPasswordtoken: otp },{forgotPasswordtoken:"", password:newpassword});
        if (!user) {
            return ShowError(400, "Incorrect token. Please enter the correct token.");
        }
        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error: any) {
        return ShowError(400, error?.message);
    }
}