import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
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
        const query:any={}
        if(province) query['province'] = +province;
        const appointmentsCount = await User.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$documentVerified.status",
                    count: { $sum: 1 },
                    name: { $first: "$documentVerified.status"}
                }
            }
        ]);
        return NextResponse.json(appointmentsCount, { status: 200 });
    
    
    } catch (error: any) {
        return ShowError(500, error?.message || "Internal Server Error");
    }
}