import dbconnect from "@/lib/dbConnect";
import { Administrator } from "@/models/AdministratorsModel";
import { NewsModel } from "@/models/NewsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
       await dbconnect();
 const start = req.nextUrl.searchParams.get("start");
 const end = req.nextUrl.searchParams.get("end");
 const query:any={}
    if(start && end){
        query['date'] = {$gte: new Date(start), $lte: new Date(end)}
    }
    else if(start && !end){
        query['date'] = {$gte: new Date(start)}
    }
    else if(end && !start){
        query['date'] = {$lte: new Date(end)}
    }

       const general = await NewsModel.find(query).sort({date:-1}).populate({
        path:"createdBy",
        select:"name", 
        model:Administrator
        })
        return NextResponse.json(general, {status:200});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}
