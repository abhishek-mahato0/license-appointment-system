import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { generateToken } from "@/utils/generateToken";
import { sendMail } from "@/utils/sendTokenEmail";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
 
export async function POST(req: NextRequest) {
    await dbconnect();
    try {
      const {email,password,name}  = await req.json();
      if( !email || !password || ! name){
        return ShowError(400,"Missing Fields")
      }
      const exists = await User.findOne({email});
      if(exists){
        return ShowError(400,"User already exists.")
      }
      let hashpassword = bcrypt.hashSync(password,10);
      if(!hashpassword){
        return ShowError(400,"Some error occured.")
      }
      const token = await generateToken({name,email})
      if(!token){
        return ShowError(400,"Some error occured while token generration")
      }
      const user = new User({
        name,email,password:hashpassword,token
      })
      if(!user){
        return ShowError(400,"Some error occured.")
      }
        await user.save();
        await sendMail(user.email,token,user._id.toString())
        return NextResponse.json({message:"A verification email is sent."}, {status:201})
        
    } catch (error:any) {
        return NextResponse.json({error:error?.message}, {status:400})
    }
}
   
   


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
};