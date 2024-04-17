import dbconnect from "@/lib/dbConnect";
import { Questions } from "@/models/QuestionsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const category = req.nextUrl.searchParams.get("category");
        const page = req.nextUrl.searchParams.get("page");
        const type = req.nextUrl.searchParams.get("type");
        const preparation = req.nextUrl.searchParams.get("preparation");
        const query:any={}
        if(preparation ==="quiz"){
          const generalQuestions = await Questions.aggregate([
            { $match: { type: 'general' } },
            { $sample: { size: 10 } }
          ]);
          
          const signQuestions = await Questions.aggregate([
            { $match: { type: 'sign' } },
            { $sample: { size: 5 } }
          ]);
          const questions = [...generalQuestions, ...signQuestions];
          return NextResponse.json(questions, {status:200})
        }
        if(type && type !=="null"){
            if(type !== "all")
              query['type'] = type;
        }
        if(category){
            if(category !== "all")
            query['category'] ={$in: category.split(",")};
        }
        const questions = await Questions.find(query).skip((parseInt(page && page || "1")-1)*5).limit(10);
        const total = await Questions.countDocuments(query);
        return NextResponse.json({questions, total:total}, {status:200})
        
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}