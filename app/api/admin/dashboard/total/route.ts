import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { Administrator } from "@/models/AdministratorsModel";
import { Appointment } from "@/models/appointmentsModel";
import { OfficeModel } from "@/models/OfficeModel";
import { Questions } from "@/models/QuestionsModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
      await dbconnect();
      const loggedInUser = await checkAdmins(req);
      if(!loggedInUser){
        return ShowError(400, "You are not authorized to perform this action");
      }
      const province = req.nextUrl.searchParams.get("province");
      const from = req.nextUrl.searchParams.get("from");
      const to = req.nextUrl.searchParams.get("to");
      const query:any = {};

      if(province) query['province'] = +province;
      if(from && to) query['bookdate'] = {$gte: new Date(from), $lte: new Date(to)};
      if(!from && to) query['bookdate'] = {$lte: new Date(to)};
      if(from && !to) query['bookdate'] = {$gte: new Date(from)};
  
        const Appointments = await Appointment.countDocuments(query);
        const Users = await User.countDocuments(query);
        const Admins = await Administrator.countDocuments(query);
        const Offices = await OfficeModel.countDocuments(query);
        const Question = await Questions.countDocuments(query);
        return NextResponse.json({
            Appointments,
            Users,
            Admins,
            Offices,
            Question
        }, {status:200}) 
        
    } catch (error:any) {
     return ShowError(500, error?.message || "Internal Server Error");        
    }
}