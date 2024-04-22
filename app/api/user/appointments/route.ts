import dbconnect from "@/lib/dbConnect";
import { checkLogin } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { OfficeModel } from "@/models/OfficeModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res:NextResponse) {
    try {
        await dbconnect();
        const logged = await checkLogin(req)
        const status = req.nextUrl.searchParams.get('status');
        const category = req.nextUrl.searchParams.get('category');
        if(!logged){
            return ShowError(401, "Unauthorized");
        }
            const ans = await Appointment.find({user_id:logged?._id}).populate({
                path:"medical",
                model:MedicalModal,
               
            }).populate({
                path:"written",
                model:WrittenModal,
            
            }).populate({
                path:"trial",
                model:TrailModal
            }).populate({
                path:'office',
                model:OfficeModel,
                select:'name'
            }).sort({bookDate:-1});
            return NextResponse.json(ans, { status: 200 });
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}

export async function PUT(req:NextRequest, res:NextResponse){
    try {
        await dbconnect();
        const logged = await checkLogin(req)
        const id = req.nextUrl.searchParams.get('id')
        if(!id){
            return ShowError(400, " Id is required feild.")
        }
        if(!logged){
            return ShowError(401, "Unauthorized");
        }
        const app = await Appointment.findOneAndUpdate({_id:id, user_id:logged?._id},{status:"cancel"});
        if(!app){
            return ShowError(400, "Some error occured. Try again")
        }
        await User.findByIdAndUpdate(logged?._id, {hasApplied:false});
        return NextResponse.json({ message:'Canceled Successfully'}, {status:200})
        
    } catch (error: any) {
        return ShowError(500, error.message)
    }
}