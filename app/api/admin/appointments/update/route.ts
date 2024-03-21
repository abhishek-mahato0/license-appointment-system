import dbconnect from "@/lib/dbConnect";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { Appointment } from "@/models/appointmentsModel";
import { Citizenship, IDocument } from "@/models/citizenshipModel";
import { ILDocument, ILicense, License } from "@/models/licenseModel";

import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbconnect();
    const date = req.nextUrl.searchParams.get("date");
    const category = req.nextUrl.searchParams.get("category");
    const office = req.nextUrl.searchParams.get("office");
    await dbconnect();
    const appointments = await MedicalModal.find({
      date: date || convertDate(new Date()),
      category: category || "A",
      office: office || "Bhaktapur",
    }).populate({
      path: "user_id",
      model: User,
    });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbconnect();
    const type = req.nextUrl.searchParams.get("type");
    if (!type) return ShowError(400, "Type is required");
    const { id, status, app_id } = await req.json();

    if (!id || !status || !app_id)
      return ShowError(400, "Id and status is required");
    if (status === "failed") {
      const appointment = await Appointment.findByIdAndUpdate(app_id, {
        status: "failed",
        hasApplied: false,
      });
      const user = await User.findById(appointment?.user_id);
      if (!user) return ShowError(400, "User not found");
      if (type === "medical") {
        const exists = await MedicalModal.findByIdAndUpdate(
          appointment?.medical,
          { status }
        );
        user.hasFailed = "medical";
        const exists2 = await TrailModal.findByIdAndUpdate(appointment?.trial, {
          status,
        });
        const exists3 = await WrittenModal.findByIdAndUpdate(
          appointment?.written,
          { status }
        );
      } else if (type === "trial") {
        const exists = await TrailModal.findByIdAndUpdate(appointment?.trial, {
          status,
        });
        user.hasFailed = "trial";
      } else if (type === "written") {
        const exists = await WrittenModal.findByIdAndUpdate(
          appointment?.written,
          { status }
        );
        const exists2 = await TrailModal.findByIdAndUpdate(appointment?.trial, {
          status,
        });
        user.hasFailed = "written";
      }
      user.hasApplied = false;
      await user.save();
      return NextResponse.json(
        { message: "Exam updated successfully" },
        { status: 200 }
      );
    }
    console.log(type, status, app_id, id, "here");

    if (status === "passed" && type === "trial") {
      console.log("comes");
      const appointment = await Appointment.findByIdAndUpdate(app_id, {
        status: "passed",
      });
      if (!appointment) return ShowError(400, "Appointment not found");
      console.log(appointment, "user_id");
      const citizenship = await Citizenship.findOne({
        user_id: appointment?.user_id,
      });
      console.log(citizenship, "citizenship");
      const licenseexists = await License.findOne({
        user_id: appointment?.user_id,
      });
      if (licenseexists) {
        const license = await License.findByIdAndUpdate(licenseexists._id, {
          $push: {
            license: { category: appointment?.category, date: new Date() },
          },
        });
        const user = await User.findByIdAndUpdate(
          { _id: appointment?.user_id },
          { hasApplied: false, license_id: license._id  }
        );
      } else {
        const license = new License<ILDocument>({
          user_id: appointment?.user_id,
          license: {
            license_no: citizenship?.citizenship?.citizenship_no + "L",
            category: appointment?.category,
            office: appointment?.office,
            license_date: new Date(),
            image: {
              front: "shdjfshdkf",
              back: "lskdhflksdf",
            },
            expire_date: new Date(
              new Date().setFullYear(new Date().getFullYear() + 5)
            ),
            province: citizenship?.province,
          },
        });
        await license.save();

        const user = await User.findByIdAndUpdate(
          { _id: appointment?.user_id },
          { hasApplied: false, license_id: license._id  }
        );
      }
    }

    if (type === "medical") {
      const exists = await MedicalModal.findByIdAndUpdate(id, { status });
      return NextResponse.json(
        { message: "Medical exam updated successfully" },
        { status: 200 }
      );
    } else if (type === "trial") {
      const exists = await TrailModal.findByIdAndUpdate(id, { status });
      return NextResponse.json(
        { message: "Trial exam updated successfully" },
        { status: 200 }
      );
    } else if (type === "written") {
      const exists = await WrittenModal.findByIdAndUpdate(id, { status });
      return NextResponse.json(
        { message: "Written exam updated successfully" },
        { status: 200 }
      );
    }

    return ShowError(400, "Invalid type");
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}
