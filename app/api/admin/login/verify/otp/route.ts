import { Administrator } from "@/models/AdministratorsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const email= req.nextUrl.searchParams.get("email");
        const otp = req.nextUrl.searchParams.get("otp");
        if(!email || !otp){
            return ShowError(400,"Email and otp is required");
        }
        const user = await Administrator.findOne({username:email, forgetPasswordToken: otp });
        if (!user) {
            return ShowError(400, "Incorrect token. Please enter the correct token.");
        }
        return NextResponse.json({ message: "Token verified" }, { status: 200 });
    } catch (error: any) {
        return ShowError(400, error?.message);
    }
}