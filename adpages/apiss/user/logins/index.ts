// import { User } from "@/models/userModel";
// import ShowError from "@/utils/ShowError";
// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import dbconnect from "@/lib/dbConnect";
// import { NextResponse } from "next/server";

// export default async function handler(req:NextApiRequest,res:NextApiResponse){
//     if(req.method==="POST"){
//     try {
//         await dbconnect(res);
//         const {email,pass} = req.body;
//         if(!email || !pass){
//          return ShowError(res,400,"Missing fields")
//         }
//         await dbconnect(res);
//         const exists = await User.findOne({email})
//         if(!exists){
//             return ShowError(res,400,"Invalid email or password")
//         }
//         if(exists?.isVerifiedByEmail=='false'){
//             return ShowError(res,400,"User not verified.")
//         }
        
//         const matched=await bcrypt.compare(pass, exists.password)
//         if(!matched){
//             return ShowError(res,400,"Invalid email for password")
//         }
//         const {password,...others} = exists._doc;

//         const token = await jwt.sign({...others}, process.env.JWT_SECRET as string)
//         if(!token){
//             return ShowError(res,400,"Some error occured")
//         }
//         NextResponse.next().cookies.set('jwttoken', token)
//         res.status(200).json({message:"Login Successfull.", user:{...others,token}})
        
//     } catch (error:any) {
//         ShowError(res,400,error?.message)
//     }
// }

// }