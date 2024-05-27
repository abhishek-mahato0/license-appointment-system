import dbconnect from "@/lib/dbConnect";
import { Administrator } from "@/models/AdministratorsModel";
import { NewsModel } from "@/models/NewsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
       await dbconnect();
       const featured = await NewsModel.find({ category:'Featured'}).sort({date:-1}).populate({
              path:"createdBy",
              select:"name", 
              model:Administrator
       }).limit(5)
       const featuredall = await NewsModel.find({ category:'Featured'}).sort({date:-1}).populate({
        path:"createdBy",
        select:"name", 
        model:Administrator
 })
 
        return NextResponse.json({featured,featuredall}, {status:200});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}
