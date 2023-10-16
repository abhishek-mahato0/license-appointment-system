import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId, token } = req.query;
  try {
    if (!userId || !token) {
      return ShowError(res, 400, "Not valid url.");
    }
    const user = await User.findById({ _id: userId.toString() });
    if (!user) {
      return ShowError(res, 400, "No user found");
    }
    if (user?.isverifiedByEmail) {
      return res.status(200).json({ message: "User already verified" });
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
      res.status(200).json({ message: "User verified successfully" });
    } else {
      ShowError(res, 400, "No user found. Invalid token");
    }
  } catch (error: any) {
    return ShowError(res, 400, error?.message);
  }
}
