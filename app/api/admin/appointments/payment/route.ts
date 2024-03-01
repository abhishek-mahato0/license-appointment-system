import dbconnect from "@/lib/dbConnect";
import ShowError from "@/utils/ShowError"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        await dbconnect();
        
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}