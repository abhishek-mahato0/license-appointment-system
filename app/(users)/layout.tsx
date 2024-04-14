import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../../components/common/Navbar";
import SmallNav from "@/components/common/SmallNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online License Appointment Syatem",
  description:
    "This is an official website of nepal gevernmant for appying for new license.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="fixed z-40 top-0 left-0 bg-white lg:bottom-0">
        <Navbar />
        <SmallNav />
      </div>
      <main className="w-full lg:pl-[105px] px-6 pt-10 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
