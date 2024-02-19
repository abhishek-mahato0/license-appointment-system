import AdminNavbar from "@/components/admin/AdminNavbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <div className="fixed z-40 top-0 left-0 bg-white bottom-0">
        <AdminNavbar />
      </div>
      <main className="w-full pl-[105px]">{children}</main>
    </div>
  );
}
