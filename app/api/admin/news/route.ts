import { checkAdmins } from "@/lib/userAuth";
import { NewsModel } from "@/models/NewsModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const news = await NewsModel.find().sort({date:-1});
        return NextResponse.json(news, {status:200});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}

export async function POST(req:NextRequest){
    try {
        const loggedUser = await checkAdmins(req);
        if(!loggedUser) return ShowError(401, "You are not authorized. Please login again.");
        const {title, description, img} = await req.json();
        if(!title || !description) return ShowError(400, "All fields are required");
        const picture = await uploadPicture(img, "news", String("news"+Date.now()))
        if(!picture?.url) return ShowError(500, "Failed to upload image");
        const {url} = picture;
        const news = new NewsModel({title, description, img:url, createdBy: loggedUser._id});
        await news.save();
        return NextResponse.json(news, {status:201});
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}
