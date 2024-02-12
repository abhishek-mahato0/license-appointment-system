import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:any) {
  try {
    const userId = params.userId;
  const token = req.nextUrl.searchParams.get('token');
    if (!userId || !token) {
      return ShowError(400, "Not valid url.");
    }
    const user = await User.findById(userId.toString());
    if (!user) {
      return ShowError(400, "No user found");
    }
   
    if (user?.isverifiedByEmail) {
      return NextResponse.json({ message: "User already verified" }, {status:200});
    }
    const isVerified = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    const tokenUser = JSON.parse(JSON.stringify(isVerified));

    if (user?.email.toString() === tokenUser?.email.toString()) {
      const changed = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          token: "",
          isverifiedByEmail: true,
        }
      );
      await changed.save();
      return NextResponse.json({ message: "User verified successfully" }, {status:200});
    } else {
      ShowError( 400, "No user found. Invalid token");
    }
  } catch (error: any) {
    console.log(error?.message);
    return ShowError(400, error?.message);
  }
}
