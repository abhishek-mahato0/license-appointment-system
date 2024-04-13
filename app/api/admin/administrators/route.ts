import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import ShowError from "@/utils/ShowError"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendCustomMail } from "@/utils/sendTokenEmail";
import { newAdministratorTemplate } from "@/utils/EmailTemplate";

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        
        if(!loggedUser){
            return ShowError(401, "Unauthorized. Login Again.");
        }

        const users = await Administrator.find({
            office: loggedUser.role==="superadmin" ? {$ne:null} : loggedUser?.office
        }).select('-password').populate(
            {
                path: 'createdBy',
                model :Administrator,
                select: 'name'
            }
        ).populate('office');
        if(!users){
            return ShowError(400, "No users found");
        }
        return NextResponse.json(users, {status: 200});
        
    } catch (error:any) {
        return ShowError(500, error.message)
        
    }
}

export async function PATCH(req:NextRequest){
    try {
        await dbconnect();
        const {id, content} = await req.json();
        const loggedUser = await checkAdmins(req);
        
        if(!loggedUser || (loggedUser.role !== "superadmin" || loggedUser.role !== "admin")){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        const user = await Administrator.findByIdAndUpdate(id,content, {new:true});
        if(!user){
            return ShowError(400, "No user found");
        }
        return NextResponse.json(user, {status: 200});
    }catch(error:any){
        return ShowError(500, error.message)
    }
}

export async function DELETE(req:NextRequest, {params}:any){
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        
        if(!loggedUser || loggedUser.role !== "superadmin"){
            return ShowError(401, "Unauthorized. Login Again.");
        }
       const id = req.nextUrl.searchParams.get('id');
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
        const loggedUser = await checkAdmins(req);
        
        if(!loggedUser){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        else if(loggedUser.role !== "superadmin" && loggedUser.role !== "admin"){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        const {name, username, password, role, province, office, send} = await req.json();
        if(!name || !username || !password || !role || !province || !office){
            return ShowError(400, "All fields are required");
        }
        const exists = await Administrator.findOne({username});
        if(exists){
            return ShowError(400, "User already exists");
        }
        let haspass = await bcrypt.hash(password, 10);
        const user = await Administrator.create({name,username, password:haspass, role, province, office, createdBy: loggedUser._id });
        if(!user){
            return ShowError(400, "No user found");
        }
        await sendCustomMail(username, "Account Created", `Your account has been created. Please login with your credentials.`, newAdministratorTemplate({name:name, email:username, password:password }) ,"message");
        return NextResponse.json(user, {status: 201});
    }catch(error:any){
        return ShowError(500, error.message)
    }
}
