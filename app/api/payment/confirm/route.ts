import { apiinstance } from "@/services/Api";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
      const pidx = req.nextUrl.searchParams.get("pidx");
      const purchase_order_id = req.nextUrl.searchParams.get("purchase_order_id");
      const purchase_order_name = req.nextUrl.searchParams.get("purchase_order_name");
        if(!pidx || !purchase_order_id || !purchase_order_name){
        return ShowError(400, "Missing fields");
        }
      const { data } = await apiinstance.post(
        "https://a.khalti.com/api/v2//epayment/lookup/",
        {
          pidx: pidx,
        },
        {
          headers: {
            Authorization: `key a558b8820fa84abca6fd20cf6c51a0f0`,
            "Content-Type": "application/json",
          },
        }
      );
      if(data?.status === "Completed"){
        const res = await apiinstance.post("user/payment", {
            app_id: purchase_order_id,
            user_id: purchase_order_name,
            pidx: pidx,
          });
          if (res.status === 200) {
            return NextResponse.redirect("/appointments")
          }
      }
      return NextResponse.json({message:"Payment Failed"}, { status: 200 });
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}