import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:any) {
    try {
        console.log(params.id)
        const token = req.nextUrl.searchParams.get('token');
        console.log(token)
    return NextResponse.json({message:"Hello World"}, {status:200})
    } catch (error:any) {
        console.log(error?.message)
    }
    
}