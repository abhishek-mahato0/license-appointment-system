import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        // if (!loggedUser) {
        //     return ShowError(400, "You are not authorized to perform this action");
        // }
        const province = req.nextUrl.searchParams.get("province");

        const query:any={
            role: { $in: ['admin', 'editor'] }
        }

        if(province) query['province'] = +province;
        const userCount = await Administrator.aggregate([
            { $match: query },
            {
              $group: {
                _id: "$role",
                count: { $sum: 1 },
                name: { $first: "$role"}
              }
            }
          ]);
     
        return NextResponse.json( userCount, { status: 200 });
    
    
    } catch (error: any) {
        return ShowError(500, error?.message || "Internal Server Error");
    }
}