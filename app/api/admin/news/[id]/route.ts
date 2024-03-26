import { Administrator } from "@/models/AdministratorsModel";
import { NewsModel } from "@/models/NewsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    if(!params.id) return ShowError(400, "id is required");
    const news = await NewsModel.findById(params.id).populate({
      path:"createdBy",
      select:"name", 
      model:Administrator
    });
  
    return NextResponse.json(news, { status: 200 });
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const {title, category, description } = await req.json();
    if (!title || !category || !description) return ShowError(400, "All fields are required");
    const news = await NewsModel.findByIdAndUpdate(params.id, {title, category, description }, { new: true });
    return NextResponse.json(news, { status: 200 });
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    if(!params.id) return ShowError(400, "id is required");
    const news = await NewsModel.findByIdAndDelete(params.id);
    return NextResponse.json(news, { status: 200 });
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}