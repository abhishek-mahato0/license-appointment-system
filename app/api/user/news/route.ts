import { Administrator } from "@/models/AdministratorsModel";
import { NewsModel } from "@/models/NewsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
       const featured = await NewsModel.find({ category:'Featured'}).sort({date:-1}).populate({
              path:"createdBy",
              select:"name", 
              model:Administrator
       }).limit(4)
       const featuredall = await NewsModel.find({ category:'Featured'}).sort({date:-1}).populate({
        path:"createdBy",
        select:"name", 
        model:Administrator
 })
       const general = await NewsModel.find({ category:'General'}).sort({date:-1}).populate({
        path:"createdBy",
        select:"name", 
        model:Administrator
        })
        return NextResponse.json({featured, general, featuredall}, {status:200});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}
