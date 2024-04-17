import dbconnect from "@/lib/dbConnect";
import { checkLogged } from "@/lib/userAuth";
import { License } from "@/models/licenseModel";
import { RenewModel } from "@/models/RenewModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const isLogged = await checkLogged(req);
    const {license_no, office, province, tracking_id} = await req.json();
   const renewLicense = new RenewModel({
    tracking_id: tracking_id,
    license_no: license_no,
    office,
    province,
    date: new Date()
   });
    await renewLicense.save();
    return NextResponse.json({status: 200, message: "License renewed successfully."});
  } catch (error: any) {
    return ShowError(400, error?.message);
  }
}

export async function GET(req:NextRequest, {params}:any){
    try {
        await dbconnect();
        const {id} = params;
        const renew = await RenewModel.find({ $or : [{tracking_id: id}, {license_no:id}] })
        return NextResponse.json(renew, {status: 200})
    } catch (error:any) {
        return ShowError(400, error?.message);
    }
}
