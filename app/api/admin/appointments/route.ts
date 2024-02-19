import { checkAdmins, checkLogin } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

// function switchModel(type:string){
//     switch (type) 
//     {
//         case "medical":
//             return MedicalModal;
//         case "trial":
//             return TrailModal;
//         case "written":
//             return WrittenModal;
//         default:
//             return null;
//     }
// }
// export async function GET(req: NextRequest, res:NextResponse) {
//     try {
//         const type= req.nextUrl.searchParams.get('type');
//         if(!type){
//             return ShowError(400, "No type found. Invalid request");
//         }
//         const user = await checkAdmins(req);
//         if(!user){
//             return ShowError(401, "Unauthorized");
//         }
//         if(user?.role !== "superadmin"){
//             const ans = await switchModel(type)?.find({
//                 office:{
//                     $in: user?.office
//                 }
//             });
//             return NextResponse.json(ans, { status: 200 });
//         }
//         const ans = await switchModel(type)?.find();
//         return NextResponse.json(ans, { status: 401 });
//     } catch (error:any) {
//         return ShowError(500, error.message)
//     }
// }

export async function GET(req: NextRequest, res:NextResponse) {
    try {
        const date = req.nextUrl.searchParams.get('date');
        if(!date){
            return ShowError(400, "No date found. Invalid request");
        }
        const user = await checkAdmins(req);
        if(!user){
            return ShowError(401, "Unauthorized");
        }
        if(user?.role !== "superadmin"){
            const ans = await Appointment.find({
                office:{
                    $in: "Lahan"
                }
            }).populate({
                path:"medical",
                model:"medical",
               
            }).populate({
                path:"written",
                model:"written",
            
            }).populate({
                path:"trial",
                model:"trail"
            });
            return NextResponse.json(ans, { status: 200 });
       }
        const ans = await Appointment.find();
        return NextResponse.json(ans, { status: 401 });
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}
