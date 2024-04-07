import { checkLogin } from "@/lib/userAuth";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { User } from "@/models/userModel";

export async function PATCH(req: NextRequest) {
    try {
        const exists = await checkLogin(req);
        if (!exists) {
            return ShowError(400, "Incorrect token. Please login again.");
        }
        const password = await req.json();
        if(!password){
            return ShowError(400,"Password is required");
        }
        const user = await User.findById(exists._id);
        if (!user) {
            return ShowError(400, "User not found");
        }
        const matched = await bcrypt.compare(password?.oldPassword, user.password);
        if( matched){
            user.password = bcrypt.hashSync(password?.newPassword, 10);
            await user.save();
            return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
        } 
        return ShowError(400, "Current password is incorrect. Please try again.");
    } catch (error: any) {
        return ShowError(400, error?.message);
    }
}