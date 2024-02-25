import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Administrator } from "@/models/AdministratorsModel";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await dbconnect();
        const { email, pass } = await req.json();
        if (!email || !pass) {
            return ShowError(400, "Missing fields")
        }
        const exists = await Administrator.findOne({ username: email, password: pass})
        if (!exists) {
            return ShowError(400, "Invalid email or password")
        }
       
        // const matched = await bcrypt.compare(pass, exists.password)
        // if (!matched) {
        //     return ShowError(400, "Invalid email for password.")
        // }
        const { password, ...others } = exists._doc;

        const token = await jwt.sign({ ...others }, process.env.JWT_SECRET as string)
        if (!token) {
            return ShowError(400, "Some error occured")
        }
        //NextResponse.next().cookies.set('jwttoken', token)
        const res = NextResponse.json({ message: "Login Successfull.", user: { ...others, token }, status: 200 })
        res.cookies.set("token", token, { httpOnly: true, expires: new Date(Date.now() + 900000) });
        return res;
        //return NextResponse.json({ message: "Login Successfull.", user: { ...others, token }, status: 200 })
    } catch (error: any) {
        return ShowError(400, error?.message)
    }
}