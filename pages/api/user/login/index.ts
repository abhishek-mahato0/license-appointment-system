import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'
import dbconnect from "@/lib/dbConnect";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){
    try {
        const {email,password} = req.body;
        if(!email || !password){
         return ShowError(res,400,"Missing fields")
        }
        await dbconnect(res);
        const exists = await User.findOne({email})
        if(!exists){
            return ShowError(res,400,"Invalid email or password")
        }
        if(!exists.isVerifiedByEmail){
            return ShowError(res,400,"User not verified.")
        }
        const matched=await bcrypt.compare(password, exists.password)
        if(matched){
        res.status(200).json({message:matched})
        }
        
    } catch (error:any) {
        ShowError(res,400,error?.message)
    }
}

}