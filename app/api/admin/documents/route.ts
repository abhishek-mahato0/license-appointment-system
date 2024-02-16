import { checkAdmins, checkLogin } from "@/lib/userAuth";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        
        const user = await checkAdmins(req);
        
        return NextResponse.json(user, { status: 200 });

    } catch (error:any) {
        return ShowError(500, error.message)
    }
}