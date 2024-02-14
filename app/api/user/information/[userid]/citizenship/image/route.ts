import dbconnect from "@/lib/dbConnect";
import { Citizenship } from "@/models/citizenshipModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const userId = params.userid;
    const citizenship = await req.json();
    if (!citizenship.image.front || !citizenship.image.back) {
      return ShowError(400, "Please provide front and back picture.");
    }
    if (!userId) {
      return ShowError(400, "Not valid url.");
    }
    const citizenshipPicFront = await uploadPicture(
      citizenship.image.front,
      "citizenship",
      userId.toString() + "citizenshipfront"
    );
    const citizenshipPicBack = await uploadPicture(
      citizenship.image.back,
      "citizenship",
      userId.toString() + "citizenshipback"
    );
    const payload = {
        ...citizenship,
            image: {
            front: citizenshipPicFront.url,
            back: citizenshipPicBack.url,
            },
        }
    const userDocuments = await Citizenship.findOneAndUpdate({ user_id: userId }, {
        citizenship: payload
    });
    if (!userDocuments) {
      return ShowError(
        400,
        "No documents found. Please register citizenship first."
      );
    }
    await userDocuments.save();
    return NextResponse.json(
      { message: "Citizenship Information updated Successfully." },
      { status: 200 }
    );
  } 
  catch (error: any) {
    return ShowError(500, error.message);
  }
}
