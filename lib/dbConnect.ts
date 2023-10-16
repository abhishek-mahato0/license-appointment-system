import mongoose from "mongoose";
import { NextApiResponse } from "next";

const url = process.env.DB_URL || "";
export default async function dbconnect(res: NextApiResponse) {
  try {
    await mongoose.connect(url);
  } catch (error: any) {
    res.status(400).json({ error: error?.message });
  }
}
