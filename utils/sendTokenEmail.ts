import { transporter } from "@/lib/nodemailerConfig";
import { NextApiResponse } from "next";
import ShowError from "./ShowError";

export async function sendMail(res:NextApiResponse, email:string,token:string, userId:string) {
    try {
       const info=await transporter.sendMail({
            from: 'licenseappointmant@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Email verification token", // Subject line
            text: "Verify you email." ,// plain text body
            html:`
            <h1>This is mail from license-appointment.</h1>
            <p>Please click the link below to verify your email </p>
            <p>${process.env.VERIFY_URL}/${userId}?token=${token}`
          })
          return res.status(201).json({message:"An email is sent to you. Click the link given to verify your account."})
    } catch (error:any) {
       ShowError(res,400,error?.message)
    }
    // send mail with defined transport object
   
}
