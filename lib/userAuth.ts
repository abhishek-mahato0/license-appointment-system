import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
import { User } from "@/models/userModel";
import { Administrator } from "@/models/AdministratorsModel";

export const checkLogin=async( req:NextRequest )=>{
    try {
        const token = req.cookies.get("token");
        if(!token){
            return null;
        }
        if(token?.value){
           const user:any = await jwt.verify(token.value, process.env.JWT_SECRET as string);
           if(JSON.parse(user)._id){
             const exists = await User.findById(JSON.parse(user)?._id);
             if(exists){
                return exists;
             }
             return null;
           }
        }
        return null;
    } catch (error:any) {
        return null;
    }
};

export const checkAdmins=async( req:NextRequest )=>{
    try {
        const token = req.cookies.get("token");
       
        if(!token){
            return null;
        }
        if(token?.value){
           const user:any = jwt.verify(token.value, process.env.JWT_SECRET as string);
           if(JSON.parse(user)._id){
             const exists = await Administrator.findById(JSON.parse(user)?._id.toString());
             if(exists){
                return exists;
             }
             return null;
           }
        }
        return null;
    } catch (error:any) {
        return null;
    }
}