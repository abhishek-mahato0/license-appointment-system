"use client";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Book,
  BookOpen,
  ChevronDown,
  LayoutDashboardIcon,
  ListChecks,
  LogOut,
  PenSquare,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const location = usePathname();
  const { data: session } = useSession();
  const [showfull, setShowfull] = useState(false);
  const dropLinks = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      comp: <LayoutDashboardIcon strokeWidth={2} size={17} width={17} />,
      short: "Dashboard",
    },
    {
      id: 2,
      name: "Apply for New License",
      href: "/apply/1",
      comp: <PenSquare strokeWidth={2} size={17} width={17} />,
      short: "Apply",
    },
    {
      id: 3,
      name: "Renew License",
      href: "/renew",
      comp: <ListChecks strokeWidth={2} size={17} width={17} />,
      short: "Renew",
    },
    {
      id: 4,
      name: "Prepare For Examinations",
      href: "/prepare",
      comp: <BookOpen strokeWidth={2} size={17} width={17} />,
      short: "Exam",
    },
  ];
  const [active, setAvtive] = useState(
    dropLinks.find((ele) => ele.href == location)
  );
  useEffect(() => {
    setAvtive(dropLinks.find((ele) => ele.href == location));
  }, [location]);
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
          {dropLinks.map((ele) => {
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
              <LogOut className=" cursor-pointer" onClick={() => signOut()} />
            )}
          </FullFlex>
        )}
      </FullFlex>
    </div>
  );
}
