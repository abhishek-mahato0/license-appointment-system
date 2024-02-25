import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const email= req.nextUrl.searchParams.get("email");
        const otp = req.nextUrl.searchParams.get("otp");
        if(!email || !otp){
            return ShowError(400,"Email and otp is required");
        }
        const user = await User.findOne({ email, forgotPasswordtoken: otp });
        if (!user) {
            return ShowError(400, "Incorrect token. Please enter the correct token.");
        }
    } catch (error: any) {
        return ShowError(400, error?.message);
    }
}