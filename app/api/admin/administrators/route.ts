import dbconnect from "@/lib/dbConnect";
import { Administrator } from "@/models/AdministratorsModel";
import ShowError from "@/utils/ShowError"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const users = await Administrator.find().select('-password');
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
        const user = await Administrator.findByIdAndUpdate(id,content, {new:true});
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status: 200});
    }catch(error:any){
        return ShowError(500, error.message)
    }
}

export async function DELETE(req:NextRequest){
    try {
        await dbconnect();
        const {id} = await req.json();
        const user = await Administrator.findByIdAndDelete(id);
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status: 200});
    }catch(error:any){
        return ShowError(500, error.message)
    }
}

export async function POST(req:NextRequest){
    try {
        await dbconnect();
        const {username, password, role, province} = await req.json();
        const user = await Administrator.create({username, password, role, province});
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status: 200});
    }catch(error:any){
        return ShowError(500, error.message)
    }
}
