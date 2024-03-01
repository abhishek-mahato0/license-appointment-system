import { checkLogged } from "@/lib/userAuth";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const token = req.cookies.delete('token');
        return NextResponse.json({message:'Logged out successfully'}, {status:200})

    } catch (error: any) {
        return ShowError(500, error?.message)
    }
}