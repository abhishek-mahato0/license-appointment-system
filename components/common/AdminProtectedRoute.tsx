"use client";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { setUser } from "@/redux/slices/userSlice";
import { apiinstance } from "@/services/Api";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const verified = ["superadmin", "admin", "editor"];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const [loading, setLoading] = React.useState(true);
  async function checkUser() {
    setLoading(true);
    try {
      const { data } = await apiinstance.get("/me");
      dispatch(setUser(data));
    } catch (err) {
      return router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }
  if (!userInfo) {
    checkUser();
  }
  if (!verified.includes(userInfo?.role)) {
    return router.push("/admin/login");
  }
  if (loading) return <div>Loading...</div>;
  return { children };

  // if (!session) return redirect("/admin/login");
  // else if (session?.user?.role !== "superadmin")
  //   return redirect("/admin/login");
  // return <>{children}</>;
}
