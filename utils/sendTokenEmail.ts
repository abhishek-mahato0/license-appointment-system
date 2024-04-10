import { transporter } from "@/lib/nodemailerConfig";
import ShowError from "./ShowError";
import { NextResponse } from "next/server";

export async function sendMail(email:string,token:string, userId:string) {
    try {
       const info=await transporter.sendMail({
            from: 'licenseappointmant@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Email verification token", // Subject line
            text: "Verify you email." ,// plain text body
            html:`
            <h1>This is mail from license-appointment.</h1>
            <p>Please click the link below to verify your email </p><br>
            <p>${process.env.VERIFY_URL}/${userId}?token=${token}`
          })
         return true;
    } catch (error:any) {
      return false;
       //ShowError(400,error?.message)
    }
    // send mail with defined transport object
   
}

export async function sendCustomMail(email:string,subject:string,text:string,html:string,message:string) {
   try {
      const info=await transporter.sendMail({
           from: 'licenseappointmant@gmail.com', // sender address
           to: email, // list of receivers
           subject: subject, // Subject line
           text: text ,// plain text body
           html:`${html}`
         })
   } catch (error:any) {
      ShowError(400,error?.message)
   }  
}
