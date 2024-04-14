"use client";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bike,
  BookOpen,
  Home,
  LayoutDashboardIcon,
  ListChecks,
  LogOut,
  MenuSquare,
  PenSquare,
  PlusCircle,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { apiinstance } from "@/services/Api";
import Link from "next/link";

type DropLinks = {
  id: number;
  name: string;
  href: string;
  comp: JSX.Element;
  short: string;
  params: string;
};

export default function SmallNav() {
  const location = usePathname();
  const params = useSearchParams().get("type");
  const { data: session } = useSession();
  const [showfull, setShowfull] = useState(false);
  const { toast } = useToast();
  const Logout = async () => {
    try {
      const res = await apiinstance.get("user/logout");
      return toast({
        title: "Success",
        description: "Logout Successfull.",
        variant: "success",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "Some error Occured",
      });
    }
  };

  const dropLinks = [
    {
      id: 0,
      name: "Public Page",
      href: "/",
      comp: <Home strokeWidth={2} size={17} width={17} />,
      short: "Home",
      params: "",
      show: true,
    },
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      comp: <LayoutDashboardIcon strokeWidth={2} size={17} width={17} />,
      short: "Dashboard",
      params: "",
      show: true,
    },
    {
      id: 2,
      name: "Apply for New License",
      href: "/apply/1?type=new",
      comp: <PenSquare strokeWidth={2} size={17} width={17} />,
      short: "Apply",
      params: "new",
      disable: String(session?.user?.hasApplied) === "true" ? true : false,
      show: true,
    },
    {
      id: 3,
      name: "Add New License Category",
      href: "/apply/1?type=add",
      comp: <PlusCircle strokeWidth={2} size={17} width={17} />,
      short: "Add",
      params: "add",
      disable: String(session?.user?.hasApplied) === "true" ? true : false,
      show: true,
    },
    {
      id: 4,
      name: "Renew License",
      href: "/renew",
      comp: <ListChecks strokeWidth={2} size={17} width={17} />,
      short: "Renew",
      params: "",
      show: true,
    },
    {
      id: 5,
      name: "Prepare For Examinations",
      href: "/prepare?page=1",
      comp: <BookOpen strokeWidth={2} size={17} width={17} />,
      short: "Exam",
      params: "",
      show: true,
    },

    {
      id: 8,
      name: "Appointments",
      href: "/appointments",
      comp: <Bike strokeWidth={2} size={17} width={17} />,
      short: "Appointments",
      params: "",
      show: String(session?.user?.hasApplied) === "true" ? true : false,
    },
    {
      id: 7,
      name: "Profile Information",
      href: "/profile",
      comp: <User strokeWidth={2} size={17} width={17} />,
      short: "Profile",
      params: "",
      disable: !session?.user,
      show: true,
    },
  ];
  const [active, setAvtive] = useState(
    dropLinks.find((ele: DropLinks) => {
      if (params && ele.params != "") {
        return ele.href.includes(location) && ele.params.includes(params);
      }
      return ele.href.includes(location);
    })
  );
  useEffect(() => {
    setAvtive(
      dropLinks.find((ele: DropLinks) => {
        if (params && ele.params != "") {
          return ele.href.includes(location) && ele.params.includes(params);
        }
        return ele.href.includes(location);
      })
    );
  }, [location, params]);
  const [show, setShow] = useState(false);

  return (
    <div className=" flex w-screen lg:hidden bg-black">
      <div className=" w-full items-center justify-between flex relative">
        <Link
          href="/"
          className="flex items-start justify-start gap-2 bg-custom-100 w-[100%] px-[10px] py-3"
        >
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
          {showfull && (
            <p className=" text-[12px] text-white font-bold">
              Governmant of Nepal
              <p className=" text-[11.5px] font-light">
                Department of Transport and license
              </p>
            </p>
          )}
        </Link>
        <MenuSquare
          strokeWidth={2}
          size={20}
          width={50}
          className=" absolute top-5 right-1 font-bold text-3xl text-white"
        />
      </div>
    </div>
  );
}
