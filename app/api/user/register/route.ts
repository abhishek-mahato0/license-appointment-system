import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { generateToken } from "@/utils/generateToken";
import { sendMail } from "@/utils/sendTokenEmail";
import { uploadPicture } from "@/utils/uploadPicture";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
 
export async function POST(req: NextRequest) {
    
    try {
      await dbconnect();
      const {email,password,name, phone, avatar}  = await req.json();
     
      if( !email || !password || ! name || !phone || !avatar){
        return ShowError(400,"Missing Fields")
      }
     
      const exists = await User.find({$or:[ {email:email}, {phone:phone}]});
      if(exists.length > 0){
        return ShowError(400,"User already exists.")
      }
      const avatarUrl = await uploadPicture(avatar, "profile", email)
      if(!avatarUrl?.url){
        return ShowError(400,"Some error occured while uploading picture.")
      }
      let hashpassword = bcrypt.hashSync(password,10);
      if(!hashpassword){
        return ShowError(400,"Some error occured. Please try again.")
      }
      const token = generateToken({name,email})
      if(!token){
        return ShowError(400,"Some error occured while token generation")
      }
     
      const user = new User({
        name,email, password:hashpassword, token, isverifiedByEmail: true, phone, avatar:avatarUrl?.url
      })
      
      if(!user){
        return ShowError(400,"User not created.")
      }
      await user.save();
     
      // await sendMail(user.email,token,user._id.toString())
      // return NextResponse.json({message:"A verification email is sent."}, {status:201})
      return NextResponse.json({message:"User created successfully."}, {status:201})
        
    } catch (error:any) {
      return ShowError(400,error?.message)
    }
}


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
};