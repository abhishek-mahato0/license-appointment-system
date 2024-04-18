"use client";
import ProgressBar from "@/components/common/ProgressBar";
import { applyProgressData } from "@/components/data/ApplyProgressBarData";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/redux/TypedHooks";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { barState } = useAppSelector((state) => state.applynew);
  const { toast } = useToast();
  const { data: session } = useSession();
  if (session?.user?.documentStatus === "pending") {
    toast({
      title: "Document Status not verified.",
      description:
        "Your document is pending. Please apply after the document is verified.",
    });
    return redirect("/profile");
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
