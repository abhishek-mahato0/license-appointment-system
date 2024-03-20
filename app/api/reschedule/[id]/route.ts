import dbconnect from "@/lib/dbConnect";
import { checkLogged } from "@/lib/userAuth";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const { id } = params;
    if (!id) return ShowError(400, "Invalid ID");
    const loggedUser = await checkLogged(req);

    const { medical, trial, written, type } = await req.json();
    if (!loggedUser)
      return ShowError(401, "You are not authorized. Please login first.");
    const appointment = await Appointment.findOne({
      _id: id,
      status: "pending",
      user_id: loggedUser._id,
    });
    if (!appointment) return ShowError(404, "Appointment not found");
    console.log(type, appointment, trial)

    if (type.includes("medical")) {
      const updatedMedical = await MedicalModal.findOneAndUpdate(
        { _id: appointment?.medical },
        { date: medical?.date, shift: medical?.shift }
      );
    
    }
    if (type.includes("trial")) {
        const updatedTrial = await TrailModal.findOneAndUpdate(
            { _id: appointment?.trial },
            { date: trial?.date, shift: trial?.shift }
            );
    }
    if (type.includes("written")) {
      const updatedWritten = await WrittenModal.findOneAndUpdate(
        { _id: appointment?.written },
        { date: written?.date, shift: written?.shift }
      );
    }
    return NextResponse.json(
      { message: "Rescheduled successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return ShowError(500, error?.message);
  }
}
