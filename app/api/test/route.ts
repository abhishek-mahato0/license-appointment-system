import { informationConfirmationtemplate, passwordChanged } from "@/utils/EmailTemplate";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await sendCustomMail("avishekh.mahato34@gmail.com", "Password Changed", "Your password has been changed successfully.", passwordChanged({email:"avishekh.mahato34@gmail.com", name:"Ram"} ) , "Message");
        return NextResponse.json({message:"Hello World"})
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}