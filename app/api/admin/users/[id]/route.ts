import dbconnect from "@/lib/dbConnect";
import { checkAdmins} from "@/lib/userAuth";
import { Citizenship } from "@/models/citizenshipModel";
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { User } from "@/models/userModel";
import { documentStatusTemplate } from "@/utils/EmailTemplate";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if (!loggedUser) {
            return ShowError(401, "Login Again.");
        }
        if(loggedUser.role !== "superadmin"){
            return ShowError(401, "Unauthorized page.");
        }
        const exists = await User.findById(params.id);
        if(!exists){
            return ShowError(400, "User does not exist");
        }
        if(exists.license_id !="none" && exists.citizenship_id !="none" && exists.information_id !="none"){
            const users = await User.findById(params.id).select("-password").populate({
                path: 'citizenship_id',
                model: Citizenship
                }).populate({
                path: 'license_id',
                model: License
                }).populate({
                path: 'information_id',
                model: Information
                });
                if (!users) {
                    return ShowError(400, "No users found");
                }
                return NextResponse.json(users, {
                status: 200
                });
        }else if(exists.license_id ==="none" && exists.citizenship_id ==="none" && exists.information_id !=="none"){
            const users = await User.findById(params.id).select("-password").populate({
                path: 'information_id',
                model: Information
                });
                if (!users) {
                    return ShowError(400, "No users found");
                }
                return NextResponse.json(users, {
                status: 200
                });
        }else if( exists.license_id ==="none" && exists.citizenship_id !=="none" && exists.information_id !== "none"){
            const users = await User.findById(params.id).select("-password").populate({
                path: 'citizenship_id',
                model: Citizenship
                }).populate({
                path: 'information_id',
                model: Information
                });
                if (!users) {
                    return ShowError(400, "No users found");
                }
                return NextResponse.json(users, {
                status: 200
                });
        }
       return NextResponse.json(exists, {status:200});
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}

export async function PATCH(req:NextRequest, {params}: {params: {id: string}}){
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if (!loggedUser) {
            return ShowError(401, "Login Again.");
        }
        if(loggedUser.role !== "superadmin"){
            return ShowError(401, "Unauthorized access.");
        }
        const content = await req.json()
        const exists = await User.findByIdAndUpdate(params.id, content);
        await sendCustomMail(exists?.email,"Status of Your Information", "User Information", documentStatusTemplate(
            {
                status: exists?.documentVerified?.status,
                user: exists?.name,
                message: content?.documentVerified?.message,
            }
        ), "Message");
        return NextResponse.json({user:exists, message:"User updated successfully"}, {status:200});
        
    } catch (error: any) {
        return ShowError(500, error.message);
            
    }
}