"use client";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bike,
  Book,
  BookOpen,
  ChevronDown,
  FolderSync,
  Home,
  LayoutDashboardIcon,
  ListChecks,
  LogOut,
  PenSquare,
  PlusCircle,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
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

export default function Navbar() {
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
      show: !session?.user
        ? true
        : session?.user?.license_id === "none"
        ? true
        : false,
    },
    {
      id: 3,
      name: "Add New License Category",
      href: "/apply/1?type=add",
      comp: <PlusCircle strokeWidth={2} size={17} width={17} />,
      short: "Add",
      params: "add",
      disable: String(session?.user?.hasApplied) === "true" ? true : false,
      show: session?.user?.license_id === "none" ? false : true,
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
      show: String(session?.user?.citizenship_id) === "none" ? false : true,
    },
    {
      id: 7,
      name: "Profile Information",
      href: "/profile",
      comp: <User strokeWidth={2} size={17} width={17} />,
      short: "Profile",
      params: "",
      disable: !session?.user,
      show: session?.user,
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

  return (
    <Suspense>
      <div
        className={`${
          showfull ? "w-[280px]" : "w-[90px]"
        } hidden lg:flex flex-col bg-white text-customtext-100 items-start justify-between border-r-[1px] shadow-md h-full duration-150 ease-in-out `}
        onMouseEnter={() => setShowfull(true)}
        onMouseLeave={() => setShowfull(false)}
      >
        <FullFlex className="w-full flex-col px-0 py-0">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-custom-100 w-full px-[2px] py-3"
          >
            <Image src="/images/logo.svg" alt="logo" width={50} height={40} />
            {showfull && (
              <p className=" text-[12px] text-white font-bold">
                Governmant of Nepal
                <p className=" text-[11.5px] font-light">
                  Department of Transport and license
                </p>
              </p>
            )}
          </Link>
          <FullFlex className=" w-full flex-col items-start mt-4">
            {dropLinks
              .filter((ele) => ele?.show)
              .map((ele) => {
                return (
                  <Links
                    href={ele?.disable ? "" : ele.href}
                    name={`${showfull ? ele.name : ele.short}`}
                    className={`${
                      active?.id === ele.id
                        ? "bg-custom-50 border-l-custom-100 text-custom-150 border-l-[4px]"
                        : ""
                    } hover:text-custom-150 hover:bg-custom-50 w-full h-full font-[500]
              ${
                showfull
                  ? "items-start justify-start py-4 flex-row text-[13px]"
                  : " items-center justify-center py-2 flex-col text-xs"
              }
              ${ele?.disable ? "cursor-not-allowed" : "cursor-pointer"}`}
                    key={ele.id}
                  >
                    {ele.comp}
                    {/* <Links
                  href={ele.href}
                  name={`${showfull ? ele.name : ele.short}`}
                  className={`${
                    !showfull
                      ? "flex-col text-xs"
                      : "flex-row text-[13px] gap-4"
                  }`}
                >
                  {ele.comp}
                </Links> */}
                  </Links>
                );
              })}
          </FullFlex>
        </FullFlex>
        <FullFlex className="w-full pb-5 border-t-2 pt-2 text-xs">
          {session?.user?.email && (
            <FullFlex className=" justify-between gap-2">
              {session.user?.avatar ? (
                <img
                  src={session.user?.avatar}
                  className=" h-10 w-10 rounded-full"
                />
              ) : (
                <Avatar>
                  <AvatarFallback className=" bg-custom-100 text-white text-sm">
                    {session.user.name?.split("")[0]}
                  </AvatarFallback>
                </Avatar>
              )}
              {showfull && (
                <p className=" text-[11px]">
                  <p className=" font-bold">{session.user?.name}</p>
                  {session?.user.email}
                </p>
              )}
              {showfull && (
                <LogOut
                  className=" cursor-pointer"
                  onClick={async () => {
                    localStorage.removeItem("userInfo");
                    signOut();
                    Logout();
                  }}
                />
              )}
            </FullFlex>
          )}
        </FullFlex>
      </div>
    </Suspense>
  );
}
