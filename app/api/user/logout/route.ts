import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, res:NextResponse){
    try {
        const res = NextResponse.json({ message: "Logout Successfull."},{status: 200 })
        res.cookies.delete("token");
        res.cookies.delete("role");
        return res;
        
    } catch (error: any) {
        return ShowError(500, error?.message)
    }
}