import dbconnect from "@/lib/dbConnect";
import { checkLogin } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { OfficeModel } from "@/models/OfficeModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
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
       
        // const from = req.nextUrl.searchParams.get('from');
        // const to = req.nextUrl.searchParams.get('to');
        // const user = await checkAdmins(req);
        // if(!user){
        //     return ShowError(401, "Unauthorized");
        // }
        // if(user?.role !== "superadmin"){
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
       //}
        //const ans = await Appointment.find();
        //return NextResponse.json(ans, { status: 401 });
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}