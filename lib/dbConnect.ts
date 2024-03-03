import mongoose from "mongoose";
import { NextResponse } from "next/server";

const url = process.env.DB_URL || "";
export default async function dbconnect() {
  const connectionState = mongoose.connection.readyState;
  try {
    if(connectionState === 1){
      console.log("ALready Connected.")
      return;
    }
    if(connectionState === 2){
      console.log("Connecting...")
      return;
    }
    await mongoose.connect(url);
    console.log("Connection successful.")
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, {status:400});
  }
}

