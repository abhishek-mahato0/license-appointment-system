import { Questions } from "@/models/QuestionsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const ques = await Questions.find();
        // const index = ques.slice(200,).map((q) => q._id);
        // const deleteResult = await Questions.deleteMany({
        //     _id: { $in: index }
        // });
        return NextResponse.json(ques?.length);

        
    } catch (error: any) {
        return ShowError(500, error?.message);
    }
}