import dbconnect from "@/lib/dbConnect";
import { OfficeModel } from "@/models/OfficeModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:any){
    try {
        const {id} = params;
        await dbconnect();
        const office = await OfficeModel.findById(id)
        if(!office){
            return ShowError(400, "No office found");
        }
        return NextResponse.json(office, {status:200});
        
    } catch (error:any) {
        return ShowError(400, error.message)
    }
}
