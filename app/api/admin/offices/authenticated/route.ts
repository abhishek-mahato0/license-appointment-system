import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { OfficeModel } from "@/models/OfficeModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await dbconnect();
        const query:any ={}
        const loggedUser = await checkAdmins(req);
        if (!loggedUser) {
            return ShowError(400, "You are not authorized to perform this action");
        }
        if(loggedUser?.role !== "super admin"){
            query["province"] = loggedUser?.province;
        }
         
        const officeList = await OfficeModel.find(query);
        return NextResponse.json(officeList,{ status: 200 });
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}