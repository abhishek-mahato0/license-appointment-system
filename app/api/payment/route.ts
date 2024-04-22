import { checkLogged, checkLogin } from "@/lib/userAuth";
import { apiinstance } from "@/services/Api";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
      const app_id = req.nextUrl.searchParams.get("app_id");
      const user = await checkLogin(req);
      if(!app_id){
        return ShowError(400, "Missing fields");
      }
      const { data } = await apiinstance.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          return_url: "http://localhost:3000/payment/verify/",
          website_url: "http://localhost:3000/",
          amount: 100000,
          purchase_order_id: app_id,
          purchase_order_name: user?._id || "Anonymous",
          customer_info: {
            name: "License Application",
            email: "licenseappointment@gmail.com",
            phone: "9800000123",
          },
        },
        {
          headers: {
            Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return NextResponse.json(data, { status: 200 });
    } catch (error:any) {
        return ShowError(500, error.message);
    }
}