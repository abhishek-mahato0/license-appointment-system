import HeaderTitle from "@/components/common/HeaderTitle";
import { authOptions } from "@/services/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return redirect("/login");
  } else if (session?.user?.citizenship_id === "none") {
    return redirect("/detailform/citizenship");
  } else if (session?.user?.license_id === "none") {
    return redirect("/detailform/license");
  } else if (
    session?.user?.information_id !== "none" &&
    session?.user?.citizenship_id !== "none" &&
    session?.user?.license_id !== "none"
  ) {
    return redirect("/detailform/summary");
  }
  return (
    <div className="flex flex-col md:mt-1 mt-5">
      <HeaderTitle title="Profile Form" />
      <div className="w-[95%] bg-custom-50 mt-1">{children}</div>
    </div>
  );
}
