import mongoose from "mongoose";
import { NextResponse } from "next/server";

const url = process.env.DB_URL || "";
export default async function dbconnect() {
  try {
    await mongoose.connect(url);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, {status:400});
  }
}
