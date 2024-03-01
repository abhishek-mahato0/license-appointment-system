import { checkLogged } from "@/lib/userAuth";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try {
        const token = req.cookies.get('token');
        if(!token){
            return ShowError(401, 'Unauthorized')
        }
        const user = 
    } catch (error: any) {
        return ShowError(500, error?.message)
    }
}
checkLogged