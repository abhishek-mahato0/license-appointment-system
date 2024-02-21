import dbconnect from "@/lib/dbConnect";
import { Appointment } from "@/models/appointmentsModel";
import { Citizenship } from "@/models/citizenshipModel";
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const users = await User.find()
        .select("-password")
        // .populate({
        //     path:'citizenship_id',
        //     model: Citizenship
        // }).populate({
        //     path:'license_id',
        //    model: License
        // })
        // .populate({
        //     path:'information_id',
        //     model: Information
        // });
        if(!users){
            return ShowError(400, "No users found");
        }
        return NextResponse.json(users, {status: 200});
        
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}

export async function PUT(req:NextRequest){
    try {
        await dbconnect();
        const {id, content} = await req.json();
        const user = await User.findByIdAndUpdate(id,content, {new:true});
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status: 200});
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}