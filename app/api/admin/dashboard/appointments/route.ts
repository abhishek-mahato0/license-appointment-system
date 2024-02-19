import { Appointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams.get("type");
    try {
    if(params==="total"){
        const totalAppointment = await Appointment.countDocuments();
        return NextResponse.json({name:"Total Appointments", count:totalAppointment}, {status:200});
    }else if( params==="category"){
        const app=[
            {
                $match:{
                    office:{$ne:null},
                }
            },
            {
            $group: {
                _id:"$category",
                name:{$first:"$category"},
                count:{$sum:1}
            }
       }
        ]
        const counts = await Appointment.aggregate(app).exec();
        return NextResponse.json(counts, {status:200});
    } else if( params==="office") {
        const counts = await Appointment.aggregate([{
            $group: {
                _id:"$office",
                name:{$first:"$office"},
                count:{$sum:1}
            }
        }])
        return NextResponse.json(counts, {status:200});
    }
    else{
        const counts = await Appointment.aggregate([{
            $group: {
                _id:"$status",
                name:{$first:"$status"},
                count:{$sum:1}
            }
        }])
        return NextResponse.json(counts, {status:200});
    }
    
    } catch (error: any) {
        return ShowError(500, error?.message || "Internal Server Error");
    }
}