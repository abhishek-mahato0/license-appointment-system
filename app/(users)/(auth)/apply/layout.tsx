"use client";
import ProgressBar from "@/components/common/ProgressBar";
import { applyProgressData } from "@/components/data/ApplyProgressBarData";
import { useAppSelector } from "@/redux/TypedHooks";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { barState } = useAppSelector((state) => state.applynew);
  const { data: session, status } = useSession();
  if (String(session?.user?.hasApplied) === "true") {
    return redirect("/dashboard");
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-5 gap-10 mb-5">
      <h1 className=" w-full text-xl text-custom-150 font-bold">
        Apply For New License
      </h1>
      <div className="w-[95%] h-[90%] gap-5 flex flex-col bg-custom-50 p-5 rounded-sm shadow-sm">
        <ProgressBar data={applyProgressData} barstate={barState} />
        {children}
      </div>
    </div>
  );
}
