"use client";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScrolled } from "@/hooks/isScrolled";
import { ChevronDown, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  const scrolled = useScrolled();
  const dropLinks = [
    {
      id: 1,
      name: "Apply for New License",
      href: "/apply",
    },
    {
      id: 2,
      name: "Renew License",
      href: "/renew",
    },
    {
      id: 3,
      name: "Prepare For Examinations",
      href: "/prepare",
    },
  ];
  console.log(scrolled);
  return (
    <FullFlex
      className={`${
        scrolled && "border-b-[1px] shadow-md"
      } justify-between px-2 py-2`}
    >
      <Image src="/images/logo.svg" alt="logo" width={50} height={40} />
      <FullFlex>
        <Links href="/dashboard" name="Dashboard">
          <LayoutDashboardIcon strokeWidth={0.9} size={17} />
        </Links>
        <DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FullFlex>
                Services
                <ChevronDown strokeWidth={2} size={18} />
              </FullFlex>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" px-0 py-0">
              {dropLinks.map((ele) => {
                return (
                  <DropdownMenuItem className="px-0 py-1">
                    <Links href={ele?.href} name={ele.name}></Links>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenu>
        <Links href="/login" name="Login" />
        <Links href="/register" name="Register" />
      </FullFlex>
    </FullFlex>
  );
}
