import { checkAdmins } from "@/lib/userAuth";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { Administrator } from "@/models/AdministratorsModel";

export async function PATCH(req: NextRequest) {
    try {
        const exists = await checkAdmins(req);
        if (!exists) {
            return ShowError(400, "Incorrect token. Please login again.");
        }
        const password = await req.json();
        console.log(password)
        if(!password){
            return ShowError(400,"Password is required");
        }
        const user = await Administrator.findById(exists._id);
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