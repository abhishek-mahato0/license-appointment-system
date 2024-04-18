"use client";
import HeaderTitle from "@/components/common/HeaderTitle";
import FormLoader from "@/components/loaders/FormLoader";
import PageLoader from "@/components/loaders/PageLoader";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const location = usePathname();
  if (status === "loading") return <FormLoader />;

  if (!session?.user?.token) {
    return router.push("/login");
  }
  return (
    <div className="flex flex-col md:mt-1 mt-5">
      <HeaderTitle title="Profile Form" />
      <div className="w-[95%] bg-custom-50 mt-1">{children}</div>
    </div>
  );
}
