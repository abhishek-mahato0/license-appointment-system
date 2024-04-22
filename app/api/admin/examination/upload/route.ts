// import { examData } from "@/components/Exam/CatA";
// import { signQues } from "@/components/Exam/Sign";
// import dbconnect from "@/lib/dbConnect";
// import { Questions } from "@/models/QuestionsModel";
// import ShowError from "@/utils/ShowError";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req:NextRequest){
//     try {
//         await dbconnect();
//         const questions = signQues.map((ele)=> ({question:ele.question, answers:ele.options, correct_answer:ele.correct_answer, category:["All"], type:"sign", img:ele.img, createdBy:"65e1fc0ab998339605edd6ee"}))
//         const uploaded = await Questions.insertMany(questions);
//         return NextResponse.json(uploaded, {status:200})
        
//     } catch (error:any) {
//         return ShowError(500, error.message);
//     }

// }