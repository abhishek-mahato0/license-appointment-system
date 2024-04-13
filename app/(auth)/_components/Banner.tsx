"use client";
import Links from "@/components/common/Links";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Banner() {
  //   const pathname = usePathname().split("/")[1];
  return (
    <div className=" flex flex-col w-full h-full px-5 py-4 bg-custom-100">
      <Link href="/" className="w-full flex gap-2 mb-6">
        <Image src="images/logo.svg" alt="logo" width={70} height={70} />
        <div className=" text-white">
          <p className=" font-bold text-sm">Government of Nepal</p>
          <p className=" font-bold text-lg">
            Department of transport and license
          </p>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-start text-left text-white leading-6 px-5 mt-5 mb-3 text-lg">
        Welcome to our official government licensing website, where we offer a
        modernized approach to license applications, renewals, and preparation.
        <p className="py-4">
          Our platform is designed with utmost simplicity and efficiency in
          mind. Whether you're an individual seeking a new license or a business
          looking to renew existing ones, we provide a seamless experience.
        </p>
        Trust us with your licensing requirements, and experience a more
        convenient and straightforward process for all your licensing needs.
      </div>
      {/* <div className="mt-3 justify-center items-center">
        {pathname && (
          <Links
            href={`${pathname === "login" ? "/register" : "login"}`}
            name={`${
              pathname === "login"
                ? "Not Registered? Register"
                : "Already Registered?"
            }`}
            rightChildren={true}
            className=" text-white hover:underline bg-black"
          >
            <ArrowRight width={15} color="white" />
          </Links>
        )}
      </div> */}
    </div>
  );
}
