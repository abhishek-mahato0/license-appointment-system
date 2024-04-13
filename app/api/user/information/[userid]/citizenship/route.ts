import dbconnect from "@/lib/dbConnect";
import { Citizenship } from "@/models/citizenshipModel";
import { User } from "@/models/userModel";
import { informationConfirmationtemplate } from "@/utils/EmailTemplate";
import { sendCustomMail } from "@/utils/sendTokenEmail";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const userId = params.userid;
    const { citizenshipInformation } = await req.json();
    const user = await User.findById(userId.toString());
    if (!user) {
        return ShowError(400, "No user found");
    }
    if (!citizenshipInformation) {
        return ShowError(400, "Please provide all the required information");
    }
    if (!citizenshipInformation?.front || !citizenshipInformation?.back) {
        return ShowError(400, "Please provide both front and back image of citizenship");
    }
    if (!citizenshipInformation?.citizenship_no || !citizenshipInformation?.type || !citizenshipInformation?.issue_date || !citizenshipInformation?.issue_district || !citizenshipInformation?.front || !citizenshipInformation?.back) {
        return ShowError(400, "Please provide all the required informations.");
    }
    const exists = await Citizenship.findOne({ $or:[{user_id: userId },{citizenship_no: citizenshipInformation?.citizenship_no}]});
    if(exists){
        return ShowError(400, "Citizenship already exists");
    }
    const citizenshipPicFront = await uploadPicture(citizenshipInformation?.front, "citizenship", user._id.toString() + "citizenshipfront");
    const citizenshipPicBack = await uploadPicture(citizenshipInformation?.back, "citizenship", user._id.toString() + "citizenshipback");
    if(!citizenshipPicFront?.url || !citizenshipPicBack?.url){
        return ShowError(400, "Error uploading license image. Please try again.");
    }
       const citizenshipData = {
            user_id: user._id,
            citizenship:{
                citizenship_no: citizenshipInformation.citizenship_no,
                citizenship_type: citizenshipInformation.type,
                issue_date: citizenshipInformation.issue_date,
                issue_district: citizenshipInformation.issue_district,
                image:{
                    front: citizenshipPicFront.url,
                    back: citizenshipPicBack.url
                }
           }
        }
    const citizenshipDoc= new Citizenship(citizenshipData);
    await citizenshipDoc.save();
    user.citizenship_id = citizenshipDoc._id;
    await user.save();
    await sendCustomMail(user?.email,"Confirmation: Receipt of Your Information", "Citizenship Information",informationConfirmationtemplate(), "Message");
    return NextResponse.json({_id: citizenshipDoc._id ,message:"Citizenship Inforamtion Saved Successfully."}, {status:200})
    } catch (error:any) {
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
          citizenship_no: citizenshipInformation.citizenship_no,
          citizenship_type: citizenshipInformation.type,
          issue_date: citizenshipInformation.issue_date,
          issue_district: citizenshipInformation.issue_district,
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
    user.documentVerified.status = "pending";
    await userDocuments.save();
    await user.save();
    return NextResponse.json(
      { message: "Citizenship Information updated Successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return ShowError(500, error.message);
  }
}
