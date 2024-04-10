import dbconnect from "@/lib/dbConnect";
import { checkLogged } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
import { appointmentRescheduleTemplate } from "@/utils/EmailTemplate";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const { id } = params;
    if (!id) return ShowError(400, "Invalid ID");
    const loggedUser = await checkLogged(req);
    if(!loggedUser) return ShowError(401,"You are not authorized. Please login first.");

    const { medical, trial, written, type } = await req.json();
    if (!loggedUser)
      return ShowError(401, "You are not authorized. Please login first.");
    const appointment = await Appointment.findOne({
      _id: id,
      status: "pending",
      user_id: loggedUser._id,
    });
    if (!appointment) return ShowError(404, "Appointment not found");

    if (type.includes("medical")) {
      var updatedMedical = await MedicalModal.findOneAndUpdate(
        { _id: appointment?.medical },
        { date: medical?.date, shift: medical?.shift }
      );
    
    }
    if (type.includes("trial")) {
        var updatedTrial = await TrailModal.findOneAndUpdate(
            { _id: appointment?.trial },
            { date: trial?.date, shift: trial?.shift }
            );
    }
    if (type.includes("written")) {
      var updatedWritten = await WrittenModal.findOneAndUpdate(
        { _id: appointment?.written },
        { date: written?.date, shift: written?.shift }
      );
    }
    await sendCustomMail(loggedUser?.email, "Appoiontment Reschedule", "Reschedule", appointmentRescheduleTemplate({user: loggedUser?.name, appointmentDate:convertDate(appointment?.bookDate), 
     appointments: [
      { name: "Medical", date: updatedMedical?.date, shift: updatedMedical?.shift },
      { name: "Trial", date: updatedTrial?.date, shift: updatedTrial?.shift },
      { name: "Written", date: updatedWritten?.date, shift: updatedWritten?.shift },
    ], 
    location: appointment?.office,  trackingNumber: appointment?.tracking_id  }) , "Message")
    return NextResponse.json(
      { message: "Rescheduled successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return ShowError(500, error?.message);
  }
}
