import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import { NewsModel } from "@/models/NewsModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const from = req.nextUrl.searchParams.get("from");
        const to = req.nextUrl.searchParams.get("to");
        const category = req.nextUrl.searchParams.get("category");
        const query:any={}
        if(from && to) query['date'] = {$gte: new Date(from), $lte: new Date(to)}
        if(category) query['category'] = category;
        if(from && !to ) query['date'] = {$gte: new Date(from)}
        if(!from && to) query['date'] = {$lte: new Date(to)}
       const news = await NewsModel.find(query).sort({date:-1}).populate({
              path:"createdBy",
              select:"name", 
              model:Administrator
       })
        return NextResponse.json(news, {status:200});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}

export async function POST(req:NextRequest){
    try {
        const loggedUser = await checkAdmins(req);
        if(!loggedUser) return ShowError(401, "You are not authorized. Please login again.");
        await dbconnect();
        const {title, description, img, category} = await req.json();
        if(!title || !description) return ShowError(400, "All fields are required");
        const picture = await uploadPicture(img, "news", String("news"+Date.now()))
        if(!picture?.url) return ShowError(500, "Failed to upload image");
        const {url} = picture;
        const news = new NewsModel({title, description, category, img:url, createdBy: loggedUser._id});
        await news.save();
        return NextResponse.json(news, {status:201});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}
