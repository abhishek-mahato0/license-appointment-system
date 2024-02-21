import dbconnect from "@/lib/dbConnect";
import { Citizenship } from "@/models/citizenshipModel";
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {
    try {
        await dbconnect();
        const users = await User.findById(params.id).select("-password").populate({
        path: 'citizenship_id',
        model: Citizenship
        }).populate({
        path: 'license_id',
        model: License
        }).populate({
        path: 'information_id',
        model: Information
        });
        if (!users) {
        return ShowError(400, "No users found");
        }
        return NextResponse.json(users, {
        status: 200
        });
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}