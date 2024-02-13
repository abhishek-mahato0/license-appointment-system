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
        return ShowError(400,"Some error occured while token generation")
      }
     
      const user = new User({
        name,email, password:hashpassword, token, isverifiedByEmail: true,
      })
      
      if(!user){
        return ShowError(400,"User not created.")
      }
      
      await user.save();
     
      // await sendMail(user.email,token,user._id.toString())
      // return NextResponse.json({message:"A verification email is sent."}, {status:201})
      return NextResponse.json({message:"User created successfully."}, {status:201})
        
    } catch (error:any) {
        ShowError(400,error?.message)
    }
}
   
   


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
};