import dbconnect from "@/lib/dbConnect";
import { Citizenship } from "@/models/citizenshipModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const userId = params.userid;
    const { citizenshipInformation } = await req.json();

    if (!citizenshipInformation) {
      return ShowError(400, "Please citizenship details.");
    }
    if (!userId) {
      return ShowError(400, "Not valid url.");
    }
    const user = await User.findById(userId.toString());
    if (!user) {
      return ShowError(400, "No user found");
    }
    if (!citizenshipInformation?.front || !citizenshipInformation?.back) {
      return ShowError(
        400,
        "Please provide both front and back image of citizenship"
      );
    }
    const citizenshipPicFront = await uploadPicture(
      citizenshipInformation?.front,
      "citizenship",
      user._id.toString() + "citizenshipfront"
    );
    const citizenshipPicBack = await uploadPicture(
      citizenshipInformation?.back,
      "citizenship",
      user._id.toString() + "citizenshipback"
    );
    if (!citizenshipPicFront?.url || !citizenshipPicBack?.url) {
      return ShowError(
        400,
        "Error uploading citizenship image. Please try again."
      );
    }

    const citizenshipData = {
      user_id: user._id,
      citizenship: {
        citizenship_no: citizenshipInformation.citizenshipno,
        citizenship_type: citizenshipInformation.citizenshiptype,
        issue_date: citizenshipInformation.citizenshipissuedate,
        issue_district: citizenshipInformation.citizenshipissuedistrict,
        image: {
          front: citizenshipPicFront.url,
          back: citizenshipPicBack.url,
        },
      },
    };
    const citizenshipDoc = new Citizenship(citizenshipData);
    user.citizenship_id = citizenshipData.citizenship.citizenship_no;
    await citizenshipDoc.save();
    await user.save();
    return NextResponse.json(
      {
        message: "Citizenship Inforamtion Saved Successfully.",
        id: citizenshipDoc.citizenship_no,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}

export async function GET(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const userId = params.userid;
    if (!userId) {
      return ShowError(400, "Not valid url.");
    }
    const user = await User.findById(userId.toString());
    if (!user) {
      return ShowError(400, "No user found");
    }
    const userDocuments = await Citizenship.findOne({ user_id: user._id });
    if (!userDocuments) {
      return ShowError(
        400,
        "No documents found. Please register citizenship first."
      );
    }
    return NextResponse.json(userDocuments, { status: 200 });
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const userId = params.userid;
    const { citizenshipInformation } = await req.json();
    if (!citizenshipInformation) {
      return ShowError(400, "Please provide all the required information");
    }
    if (!userId) {
      return ShowError(400, "Not valid url.");
    }
    const user = await User.findById(userId.toString());
    if (!user) {
      return ShowError(400, "No user found");
    }
    const userDocuments = await Citizenship.findOneAndUpdate(
      { user_id: user._id },
      {
        citizenship: {
          citizenship_no: citizenshipInformation.citizenshipno,
          citizenship_type: citizenshipInformation.citizenshiptype,
          issue_date: citizenshipInformation.citizenshipissuedate,
          issue_district: citizenshipInformation.citizenshipissuedistrict,
            image: {
                front: citizenshipInformation.front,
                back: citizenshipInformation.back,
            },
        },
      },
        { new: true }
    );
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
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}
