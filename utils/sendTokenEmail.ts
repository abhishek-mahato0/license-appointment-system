import { transporter } from "@/lib/nodemailerConfig";
import ShowError from "./ShowError";
import { accountConfirmationTemplate } from "./EmailTemplate";

export async function sendMail(email:string,token:string, userId:string, name:string) {
    try {
       const info=await transporter.sendMail({
            from: 'licenseappointmant@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Email verification token", // Subject line
            text: "Verify you email." ,// plain text body
            html: accountConfirmationTemplate({token,userId,name})
          })
         return true;
    } catch (error:any) {
      return false;
    }
   
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
