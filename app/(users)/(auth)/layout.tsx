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
  } else if (session?.user?.information_id === "none") {
    redirect("/detailform/information");
  }
  return <>{children}</>;
}
