"use client";
import FullFlex from "@/components/common/Fullflex";
import Links from "@/components/common/Links";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bike,
  BookOpen,
  Cross,
  Home,
  LayoutDashboardIcon,
  ListChecks,
  LogOut,
  MenuSquare,
  PenSquare,
  PlusCircle,
  User,
  X,
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

export default function SmallNav() {
  const location = usePathname();
  const params = useSearchParams().get("type");
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
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

  return (
    <div className=" flex w-screen md:hidden">
      <div className=" w-full items-center justify-between flex relative flex-col">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-start justify-start gap-2 bg-custom-100 w-[100%] px-[10px] py-3"
          >
            <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
            <div className="flex flex-col gap-1 text-white">
              <p className=" text-[12px] font-bold">Governmant of Nepal</p>
              <p className=" text-[11.5px] font-light">
                Department of Transport and license
              </p>
            </div>
          </Link>
          {show ? (
            <X
              className=" absolute top-5 right-3 font-bold text-3xl text-white"
              onClick={() => setShow(!show)}
            />
          ) : (
            <MenuSquare
              strokeWidth={2}
              size={20}
              width={50}
              className=" absolute top-5 right-1 font-bold text-3xl text-white"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
        <div
          className={`w-full flex flex-col justify-start gap-4 ${
            show ? "h-full" : "h-0"
          } overflow-y-auto bg-white duration-500 ease-out mt-3`}
        >
          {show &&
            dropLinks
              .filter((ele) => ele?.show)
              .map((ele) => {
                return (
                  <Links
                    href={ele?.disable ? "" : ele.href}
                    name={ele.name}
                    className={`${
                      active?.id === ele.id
                        ? "bg-custom-50 border-l-custom-100 text-custom-150 border-l-[4px]"
                        : ""
                    } hover:text-custom-150 gap-4 hover:bg-custom-50 w-full h-full font-[500] items-start justify-start py-4 flex-row text-[15px]

              ${ele?.disable ? "cursor-not-allowed" : "cursor-pointer"}`}
                    key={ele.id}
                  >
                    {ele.comp}
                  </Links>
                );
              })}
        </div>
      </div>
    </div>
  );
}
