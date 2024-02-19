import dbconnect from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbconnect();
    const params = req.nextUrl.searchParams.get("type");
    if (params === "total") {
      const usersCount = await User.countDocuments();
      return NextResponse.json(
        { name: "Total Users", count: usersCount },
        { status: 200 }
      );
    } else if (params === "verified") {
      const verified = await User.countDocuments({
        isverifiedByEmail: true,
      });
      const notverified = await User.countDocuments({
        isverifiedByEmail: false,
      });
      const payload = [
        {
          name: "Verified Users",
          count: verified,
        },
        {
          name: "Not Verified Users",
          count: notverified,
        },
      ];
      return NextResponse.json(payload, { status: 200 });
    } else {
      const verified = await User.countDocuments({
        hasApplied: true,
      });
      const notverified = await User.countDocuments({
        hasApplied: false,
      });
      const payload = [
        {
          name: "Applied For License.",
          count: verified,
        },
        {
          name: "Not Applied For License.",
          count: notverified,
        },
      ];
      return NextResponse.json(payload, { status: 200 });
    }
  } catch (error: any) {
    return ShowError(500, error?.message || "Internal Server Error");
  }
}
