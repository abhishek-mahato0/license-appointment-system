import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const hasApplied = req.nextUrl.searchParams.get("applied");
        const email = req.nextUrl.searchParams.get("byemail");
        const status = req.nextUrl.searchParams.get("status");
        const loggedUser = await checkAdmins(req);
        if(!loggedUser){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        let query:any={}
        if(hasApplied){
            query['hasApplied'] = hasApplied;
        }
        if(email){
            query['email'] = email;
        }
        if(status){
            query['documentVerified.status'] = status;
        }
        const users = await User.find(query)
        .select("-password")
       
        if(!users){
            return ShowError(400, "No users found");
        }
        return NextResponse.json(users, {status: 200});
        
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}

export async function PUT(req:NextRequest){
    try {
        await dbconnect();
        const {id, content} = await req.json();
        const user = await User.findByIdAndUpdate(id,content, {new:true});
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status: 200});
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}