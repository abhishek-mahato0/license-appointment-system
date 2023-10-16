import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";

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
      <div className=" w-full fixed z-40 top-0 right-0 left-0 bg-white">
        <Navbar />
      </div>
      <main className="w-full pt-20">{children}</main>
    </div>
  );
}
