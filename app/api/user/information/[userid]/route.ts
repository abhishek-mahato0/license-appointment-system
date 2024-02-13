import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:any){
    try {
        await dbconnect();
        const userId = params.userid;
        if(!userId){
            return ShowError(400, "Not valid url.");
        }
        const user  = await User.findById(userId);
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status:200})
        
    } catch (error:any) {
        
    }

}