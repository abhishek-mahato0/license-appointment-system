import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment, IAppointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req:NextRequest,{params}:any){
//     try {
//         await dbconnect();
//         const category = req.nextUrl.searchParams.get("category");
//         const office = req.nextUrl.searchParams.get("office")
//         const date = req.nextUrl.searchParams.get("date")
//         const appointments = await Appointment.find({
//             status:"pending",
//             $or:[{
//                 medical: {
//                     $elemMatch: {
//                       date: new Date(),
//                       status: "pending",
//                     },
//                   },
//                 },
//                 {
//                     written: {
//                         $elemMatch: {
//                           date: new Date(),
//                           status: "pending",
//                         },
//                       },
//                 },
//                 {
//                     trial: {
//                         $elemMatch: {
//                           date: new Date(),
//                           status: "pending",
//                         },
//                       },
//                 }
//             ]
//         });
//         if(!appointments) return ShowError(400, 'No appointments found');
//         if(!category || !office || !date){
//             const categorizedAppointment = appointments.reduce((acc:any, item:any)=>{
//                 if(!acc[item.category]) {
//                     acc[item.category] = {};
//                 }
//                 if(!acc[item.category][item.office]) {
//                     acc[item.category][item.office] = [];
//                 }
//                 acc[item.category][item.office].push(item);
//                 return acc;
//             }, {} as Record< string,Record<string, IAppointment[]>>)
//             return NextResponse.json(categorizedAppointment, {status:200})
//         }
//         console.log(category, office, date)
//         return NextResponse.json({date, office, category}, {status:200})
        
//     } catch (error:any) {
//         return ShowError(400, error.message)
//     }
// }

export async function GET(req:NextRequest){
    try {
        await dbconnect();
        const category = req.nextUrl.searchParams.get("category");
        const office = req.nextUrl.searchParams.get("office")
        const date = req.nextUrl.searchParams.get("date")
        let mData;
        let wData;
        let tData;
        if(!category || !office){
            const medicalData = await MedicalModal.find({
                date: date || convertDate(new Date())
            })
            const trialData = await TrailModal.find({
                date: date || convertDate(new Date())
            })
            const writtenData = await WrittenModal.find({
                date: date || convertDate(new Date())
            })
            if(medicalData){
                mData= medicalData.reduce((acc:any, item:any)=> {
                if( !acc[item.office]){
                    acc[item.office]={}
                }
                if(!acc[item.office][item.category]){
                    acc[item.office][item.category]={}
                }
                if(!acc[item.office][item.category][item.shift]){
                    acc[item.office][item.category][item.shift]={}
                }
                if(!acc[item.office][item.category][item.shift][item.status]){
                    acc[item.office][item.category][item.shift][item.status]=0;
                }
                acc[item.office][item.category][item.shift][item.status] =  acc[item.office][item.category][item.shift][item.status]+1;
                return acc;
            },{})
        }
            if(writtenData){
                wData= writtenData.reduce((acc:any, item:any)=> {
                if( !acc[item.office]){
                    acc[item.office]={}
                }
                if(!acc[item.office][item.category]){
                    acc[item.office][item.category]={}
                }
                if(!acc[item.office][item.category][item.shift]){
                    acc[item.office][item.category][item.shift]={}
                }
                if(!acc[item.office][item.category][item.shift][item.status]){
                    acc[item.office][item.category][item.shift][item.status]=0;
                }
                acc[item.office][item.category][item.shift][item.status] =  acc[item.office][item.category][item.shift][item.status]+1;
                return acc;
            },{})
        }

            if(trialData){
                tData= trialData.reduce((acc:any, item:any)=> {
                if( !acc[item.office]){
                    acc[item.office]={}
                }
                if(!acc[item.office][item.category]){
                    acc[item.office][item.category]={}
                }
                if(!acc[item.office][item.category][item.shift]){
                    acc[item.office][item.category][item.shift]={}
                }
                if(!acc[item.office][item.category][item.shift][item.status]){
                    acc[item.office][item.category][item.shift][item.status]=0;
                }
                acc[item.office][item.category][item.shift][item.status] =  acc[item.office][item.category][item.shift][item.status]+1;
                return acc;
            },{})
            }
            return NextResponse.json({
                medical:mData,
                written:wData,
                trial:tData
            })
        }
    } catch (error:any) {
        return ShowError(400, error.message || "Error occured")
    }
}