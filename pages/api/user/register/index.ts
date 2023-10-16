import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { generateToken } from "@/utils/generateToken";
import { sendMail } from "@/utils/sendTokenEmail";
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbconnect(res);
    try {
      const {email,password,name}  = req.body;
      if( !email || !password || ! name){
        return ShowError(res,400,"Missing Fields")
      }
      const exists = await User.findOne({email});
      if(exists){
        return ShowError(res,400,"User already exists.")
      }
      let hashpassword = bcrypt.hashSync(password,10);
      if(!hashpassword){
        return ShowError(res,400,"Some error occured.")
      }
      const token = await generateToken({name,email})
      if(!token){
        return ShowError(res,400,"Some error occured while token generration")
      }
      const user = new User({
        name,email,password:hashpassword,token
      })
      if(!user){
        return ShowError(res,400,"Some error occured.")
      }
        await user.save();
        await sendMail(res,user.email,token,user._id.toString())
        
    } catch (error:any) {
        res.status(400).json({error:error?.message})
    }
   
  } else {
    res.status(400).json({error:"Method not allowed"})
    
  }
}
   
   


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
};