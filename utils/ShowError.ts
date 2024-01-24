import { NextResponse } from "next/server";

export default function ShowError(status:number, message:string){
    return NextResponse.json({message:message}, {status:status})
}