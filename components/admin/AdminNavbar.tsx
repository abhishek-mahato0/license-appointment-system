"use client";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BookDown,
  BookOpen,
  Contact,
  FolderSync,
  IndianRupeeIcon,
  LayoutDashboardIcon,
  ListChecks,
  LogOut,
  Newspaper,
  User,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { apiinstance } from "@/services/Api";

type DropLinks = {
  id: number;
  name: string;
  href: string;
  comp: JSX.Element;
  short: string;
  params: string;
};
export default function AdminNavbar() {
  let authenticatedUser = ["superadmin", "admin"];
  const location = usePathname();
  const params = useSearchParams().get("type");
  const { data: session } = useSession();
  const [showfull, setShowfull] = useState(false);
  const { toast } = useToast();

  const dropLinks = [
    {
      id: 1,
      name: "Dashboard",
      href: "/admin/dashboard",
      comp: <LayoutDashboardIcon strokeWidth={2} size={17} width={17} />,
      short: "Dashboard",
      params: "",
      show: true,
    },
    {
      id: 2,
      name: "All Appointments",
      href: "/admin/appointments",
      comp: <BookDown strokeWidth={2} size={17} width={17} />,
      short: "Appointments",
      params: "",
      show: true,
    },
    {
      id: 3,
      name: "Payments",
      href: "/admin/payments",
      comp: <IndianRupeeIcon strokeWidth={2} size={17} width={17} />,
      short: "Payments",
      params: "",
      show: true,
    },

    {
      id: 4,
      name: "Transport Offices",
      href: "/admin/offices",
      comp: <ListChecks strokeWidth={2} size={17} width={17} />,
      short: "Office",
      params: "",
      show: authenticatedUser.includes(session?.user?.role || "editor"),
    },
    {
      id: 5,
      name: "Total Applicants",
      href: "/admin/applicants",
      comp: <Contact strokeWidth={2} size={17} width={17} />,
      short: "Applicants",
      params: "",
      show: true,
    },
    {
      id: 6,
      name: "Examinations",
      href: "/admin/examination",
      comp: <BookOpen strokeWidth={2} size={17} width={17} />,
      short: "Exam",
      params: "",
      show: true,
    },
    {
      id: 7,
      name: "Posted News",
      href: "/admin/news",
      comp: <Newspaper strokeWidth={2} size={17} width={17} />,
      short: "News",
      params: "",
      show: authenticatedUser.includes(session?.user?.role || "editor"),
    },
    {
      id: 8,
      name: "Administrators",
      href: "/admin/administrators",
      comp: <Users strokeWidth={2} size={17} width={17} />,
      short: "Admins",
      params: "",
      show: authenticatedUser.includes(session?.user?.role || "editor"),
    },
    {
      id: 9,
      name: "Change Password",
      href: "/admin/changepassword",
      comp: <User strokeWidth={2} size={17} width={17} />,
      short: "Change",
      params: "",
      show: true,
    },
  ];
  const [active, setAvtive] = useState(
    dropLinks.find((ele: DropLinks) => {
      if (params && ele.params != "") {
        return ele.href == location && ele.params == params;
      }
      return ele.href == location;
    })
  );
  useEffect(() => {
    setAvtive(
      dropLinks.find((ele: DropLinks) => {
        if (params && ele.params != "") {
          return ele.href.includes(location) && ele.params.includes(params);
        }
        return ele.href == location;
      })
    );
  }, [location, params]);

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

  return (
    <div
      className={`${
        showfull ? "w-[280px]" : "w-[90px]"
      } flex flex-col bg-white text-customtext-100 items-start justify-between border-r-[1px] shadow-md h-full duration-150 ease-in-out`}
      onMouseEnter={() => setShowfull(true)}
      onMouseLeave={() => setShowfull(false)}
    >
      <FullFlex className="w-full flex-col px-0 py-0">
        <FullFlex className=" gap-2 bg-custom-100 w-full px-[2px] py-3">
          <Image src="/images/logo.svg" alt="logo" width={50} height={40} />
          {showfull && (
            <p className=" text-[12px] text-white font-bold">
              Governmant of Nepal
              <p className=" text-[11.5px] font-light">
                Department of Transport and license
              </p>
            </p>
          )}
        </FullFlex>
        <FullFlex className=" w-full flex-col items-start mt-4">
          {dropLinks
            .filter((ele) => ele.show)
            .map((ele) => {
              return (
                <Links
                  href={ele.href}
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
              }`}
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
            <Avatar>
              <AvatarFallback className=" bg-custom-100 text-white text-sm">
                {session.user.name?.split("")[0]}
              </AvatarFallback>
            </Avatar>
            {showfull && (
              <p className=" text-[11px]">
                <p className=" font-bold">{session.user?.name}</p>
                {session?.user.email}
              </p>
            )}
            {showfull && (
              <LogOut
                className=" cursor-pointer"
                onClick={() => {
                  signOut();
                  Logout();
                }}
              />
            )}
          </FullFlex>
        )}
      </FullFlex>
    </div>
  );
}
