import { checkLogged } from "@/lib/userAuth";
import { Citizenship } from "@/models/citizenshipModel";
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await checkLogged(req);
    if (!user) return ShowError(401, "Unauthorized. Login again");
    if (
      user.citizenship_id != "none" &&
      user.license_id != "none" &&
      user.information_id != "none"
    ) {
      const profile = await User.findById(user._id)
        .select("-password")
        .populate({
          path: "citizenship_id",
          model: Citizenship,
        })
        .populate({
          path: "license_id",
          model: License,
        })
        .populate({
          path: "information_id",
          model: Information,
        });
      return NextResponse.json(profile, { status: 200 });
    } else if (
      user.citizenship_id === "none" &&
      user.license_id === "none" &&
      user.information_id !== "none"
    ) {
        console.log("info only")
      const profile = await User.findById(user._id)
        .select("-password")
        .populate({
          path: "information_id",
          model: Information,
        });
      return NextResponse.json(profile, { status: 200 });
    } else if (

      user.citizenship_id != "none" &&
      user.license_id == "none" &&
      user.information_id != "none"
    ) {
      const profile = await User.findById(user._id)
        .select("-password")
        .populate({
          path: "citizenship_id",
          model: Citizenship,
        })
        .populate({
          path: "information_id",
          model: Information,
        });
      return NextResponse.json(profile, { status: 200 });
    }
    const profile = await User.findById(user._id).select("-password");
    return NextResponse.json(profile, { status: 200 });
  } catch (error: any) {
    return ShowError(500, error?.message);
  }
}
