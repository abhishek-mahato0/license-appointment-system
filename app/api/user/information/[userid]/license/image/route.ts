import dbconnect from "@/lib/dbConnect";
import { License} from "@/models/licenseModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
  try {
    await dbconnect();
    const userId = params.userid;
    const license = await req.json();
    if (!license.front || !license.back) {
      return ShowError(400, "Please provide front and back picture.");
    }
    if (!userId) {
      return ShowError(400, "Not valid url.");
    }
    const licensePicFront = await uploadPicture(
      license.front,
      "license",
      userId.toString() + "licensefront"
    );
    const licensePicBack = await uploadPicture(
      license.back,
      "license",
      userId.toString() + "licenseback"
    );
    const payload = {
        license_no: license.licenseno,
        category: license.category,
        license_date: license.issuedate,
        expire_date: license.expirydate,
        office: license.office,
            image: {
            front: licensePicFront.url,
            back: licensePicBack.url,
            },
        }
    const userDocuments = await License.findOneAndUpdate({ user_id: userId }, {
        license: payload
    });
    if (!userDocuments) {
      return ShowError(
        400,
        "No documents found. Please register license first."
      );
    }
    await userDocuments.save();
    return NextResponse.json(
      { message: "license Information updated Successfully." },
      { status: 200 }
    );
  } 
  catch (error: any) {
    return ShowError(500, error.message);
  }
}
