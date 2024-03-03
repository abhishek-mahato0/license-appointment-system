"use client";
import { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { apiinstance } from "@/services/Api";
import PageLoader from "@/components/loaders/PageLoader";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
    </div>
  );
}
