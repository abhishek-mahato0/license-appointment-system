import dbconnect from "@/lib/dbConnect";
import { checkAdmins, checkLogin } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { OfficeModel } from "@/models/OfficeModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment} from "@/models/appointmentsModel";
import { Payment } from "@/models/paymentModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
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
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if(!loggedUser){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        const status = req.nextUrl.searchParams.get('status');
        const category = req.nextUrl.searchParams.get('category');
        let query:any={
        }
        if(status) query['status'] = status;
        if(category) query['category'] = category.toUpperCase();
        if(loggedUser?.role !== "superadmin"){
            query['office'] = loggedUser?.office;
        }


        // const from = req.nextUrl.searchParams.get('from');
        // const to = req.nextUrl.searchParams.get('to');
        // const user = await checkAdmins(req);
        // if(!user){
        //     return ShowError(401, "Unauthorized");
        // }
        // if(user?.role !== "superadmin"){
            const appointment:any = await Appointment.find(query).populate({
                path:"medical",
                model:MedicalModal,
               
            }).populate({
                path:"payment",
                model:Payment,
            })
            .populate({
                path:"written",
                model:WrittenModal,
            
            }).populate({
                path:"trial",
                model:TrailModal
            }).populate({
                path:'office',
                model:OfficeModel,
                select:'name'
            }).sort({bookDate:-1
            });
            return NextResponse.json(appointment, { status: 200 });
       //}
        //const ans = await Appointment.find();
        // return NextResponse.json(ans, { status: 401 });
    } catch (error:any) {
        return ShowError(500, error.message)
    }
}

export async function PUT(req:NextRequest){
    try {
        await dbconnect();  
        const id = req.nextUrl.searchParams.get('id');
        if(!id) return ShowError(400, "Id is required");
        const {status} = await req.json();
        if(!status) return ShowError(400, "Status is required");
        const exists = await Appointment.findByIdAndUpdate(id, {biometric: status});
        return NextResponse.json({message:"Biometric updated successfully"}, {status:200});
    } catch (error:any) {
        return ShowError(500, error.message);
        
    }
}