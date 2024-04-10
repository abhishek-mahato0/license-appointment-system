"use client";
import { useAppDispatch } from "@/redux/TypedHooks";
import { setBarstate } from "@/redux/slices/applynewSlice";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const params = useSearchParams().get("type");
  const dispatch = useAppDispatch();
  const location = usePathname();

  useEffect(() => {
    if (!location.includes("/apply/")) return;
    if (location.includes("/apply/1")) {
      dispatch(setBarstate({ active: 1, completed: [] }));
    } else if (location.includes("/apply/2")) {
      dispatch(setBarstate({ active: 2, completed: [1] }));
    } else if (location.includes("/apply/3")) {
      dispatch(setBarstate({ active: 3, completed: [1, 2] }));
    } else if (location.includes("/apply/4")) {
      dispatch(setBarstate({ active: 4, completed: [1, 2, 3] }));
    } else {
      dispatch(setBarstate({ active: 5, completed: [1, 2, 3, 4] }));
    }
  }, [location]);

  useEffect(() => {
    if (!session?.user?.token) return;
    if (location.includes("/renew") && session?.user.license_id === "none") {
      return redirect("/detailform/license");
    } else if (
      String(session?.user.hasApplied) === "true" &&
      location.includes("/detailform/license/")
    ) {
      return redirect("/dashboard");
    } else if (
      String(session?.user.hasApplied) === "true" &&
      location.includes("/renew")
    ) {
      return redirect("/dashboard");
    } else if (
      session?.user?.information_id !== "none" &&
      session?.user?.citizenship_id !== "none" &&
      session?.user?.license_id !== "none" &&
      location.includes("/detailform/license")
    ) {
      return redirect("/dashboard");
    }
  }, [location]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else {
    if (!session) return redirect("/login");
    if (!session?.user) {
      return redirect("/login");
    } else if (!session?.user?.token) {
      return redirect("/login");
    } else if (session?.user?.information_id === "none") {
      return redirect("/detailform/personal");
    } else if (session?.user?.citizenship_id === "none") {
      return redirect("/detailform/citizenship");
    } else if (session?.user.license_id === "none" && params === "add") {
      return redirect("/detailform/license");
    }
  }
  return <>{children}</>;
}
