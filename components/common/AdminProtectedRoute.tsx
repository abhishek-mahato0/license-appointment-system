import { authOptions } from "@/services/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FunctionComponent } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: FunctionComponent<ProtectedRouteProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/admin/login");
  else if (session?.user?.role !== "superadmin")
    return redirect("/admin/login");
  return <>{children}</>;
};

export default AdminProtectedRoute;
