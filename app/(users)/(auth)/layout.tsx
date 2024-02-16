"use client";

import { useAppDispatch } from "@/redux/TypedHooks";
import { setBarstate } from "@/redux/slices/applynewSlice";
import { authOptions } from "@/services/authOptions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const params = useSearchParams().get("type");
  const dispatch = useAppDispatch();
  const location = usePathname();
  useEffect(() => {
    console.log(location);
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
  if (status === "loading") return <div>Loading...</div>;
  else if (!userInfo?.token) {
    return redirect("/login");
  } else if (userInfo?.information_id === "none") {
    return redirect("/detailform/personal");
  } else if (userInfo?.citizenship_id === "none") {
    return redirect("/detailform/citizenship");
  } else if (userInfo.license_id === "none" && params === "add") {
    return redirect("/detailform/license");
  }
  return <>{children}</>;
}
