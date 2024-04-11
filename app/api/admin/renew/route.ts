import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { License } from "@/models/licenseModel";
import { OfficeModel } from "@/models/OfficeModel";
import { RenewModel } from "@/models/RenewModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const logged= await checkAdmins(req);
        if(!logged){
            return ShowError(400, "You are not logged in.");
        }
        const renew = await RenewModel.find().populate({
            path: "office",
            model: OfficeModel
        })
        return NextResponse.json(renew, {status: 200})
    } catch (error:any) {
        return ShowError(400, error?.message);
    }
}

export async function PATCH(req:NextRequest){
    try {
        await dbconnect();
        const logged= await checkAdmins(req);
        const {id, status} = await req.json();
        if(!logged){
            return ShowError(400, "You are not logged in.");
        }
        const renew = await RenewModel.findByIdAndUpdate(id, {status:status});
        if(!renew){
            return ShowError(400, "No renew found.");
        }
        return NextResponse.json({status: 200, message: "Renew approved successfully."});
    } catch (error:any) {
        return ShowError(400, error?.message);
    }
}