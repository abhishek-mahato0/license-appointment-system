import dbconnect from "@/lib/dbConnect";
import { checkAdmins, checkLogged, checkLogin } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import { Questions } from "@/models/QuestionsModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        await dbconnect();
       
        const params = req.nextUrl.searchParams;
        
        let query:any={}
        if(params?.get("category")) query["category"] = {$in: params?.get("category")?.split(",")}
        if(params?.get("type")) query["type"] = params.get('type');
    
        const questions = await Questions.find(query).populate({
            path:"createdBy",
            model:Administrator,
            select:"name"
        });
        return NextResponse.json(questions, {status:200})

    }catch(error:any){
        return ShowError(400, error.message)
    }
}

export async function POST(req: NextRequest){
    try{
        await dbconnect();
        const logged = await checkAdmins(req);
        if(!logged) return ShowError(401, "You are not an admin")
        if(!["superadmin", "admin"].includes(logged?.role)) return ShowError(401, "You are not authorized to perform this action");
        
        const {question, answers, correct_answer, category, type, img} = await req.json();
        if(type==="sign" && !img) return ShowError(400, "Image is required for sign questions");
        let imgUrl;
        if(type==="sign" && img){
            let upimg = await uploadPicture(img, "questions", "signs")
            imgUrl = upimg.url;
        }
        const payload={
            question, answers, correct_answer, category, type, createdBy: logged?._id, img:imgUrl
        }
        console.log(payload)
        const newQuestion = new Questions(payload);
        await newQuestion.save();
        return NextResponse.json(newQuestion, {status:201})
    }catch(error:any){
        return ShowError(400, error.message)
    }
}

export async function PATCH(req: NextRequest){
    try{
        await dbconnect();
        const logged = await checkAdmins(req);
        if(!logged) return ShowError(401, "You are not an admin")
        if(!["superadmin", "admin"].includes(logged?.role)) return ShowError(401, "You are not authorized to perform this action");
        const {_id, question, answers, correct_answer, category } = await req.json();
        const updated = await Questions.findByIdAndUpdate(_id, {question, answers, correct_answer, category}, {new:true});
        return NextResponse.json(updated, {status:200})
    }catch(error:any){
        return ShowError(400, error.message)
    }
}

export async function DELETE(req: NextRequest){
    try{
        await dbconnect();
        const logged = await checkAdmins(req);
        if(!logged) return ShowError(401, "You are not an admin")
        if(!["superadmin", "admin"].includes(logged?.role)) return ShowError(401, "You are not authorized to perform this action");
        const id = await req.nextUrl.searchParams.get("id");
        if( !id ) return ShowError(400, "Id is required");
        const deleted = await Questions.findByIdAndDelete(id);
        return NextResponse.json(deleted, {status:200})
    }catch(error:any){
        return ShowError(400, error.message)
    }
}