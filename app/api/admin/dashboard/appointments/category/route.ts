import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import { Appointment } from "@/models/appointmentsModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if (!loggedUser) {
            return ShowError(400, "You are not authorized to perform this action");
        }
        const province = req.nextUrl.searchParams.get("province");
        const from = req.nextUrl.searchParams.get("from");
        const to = req.nextUrl.searchParams.get("to");
        const query:any={}
        if(province) query['province'] = +province;
        if(from && to) query['bookdate'] = {$gte: new Date(from), $lte:new Date(to)}
        if(!from && to) query['bookdate'] = {$lte:new Date(to)}
        if(from && !to) query['bookdate'] = {$gte:new Date(from)}

        const appointmentsCount = await Appointment.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }, 
                    name: { $first: "$category" }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);


        return NextResponse.json(appointmentsCount, { status: 200 });
    
    
    } catch (error: any) {
        return ShowError(500, error?.message || "Internal Server Error");
    }
}