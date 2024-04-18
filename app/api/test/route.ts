import { apiinstance } from "@/services/Api";
import { informationConfirmationtemplate, passwordChanged } from "@/utils/EmailTemplate";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const {data} = await apiinstance.post(
            "https://a.khalti.com/api/v2/epayment/lookup/",
            {
              pidx: "96VQvN59CfsoPM9Qe5ahN6",
            },
            {
                headers: {
                  "Authorization": "key a558b8820fa84abca6fd20cf6c51a0f0",
                  "Content-Type": "application/json",
                },
              }
          );
        return NextResponse.json({message:data})
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}