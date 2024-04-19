import FullFlex from "@/components/common/Fullflex";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <FullFlex className=" w-full h-screen items-center justify-center bg-custom-50">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-custom-100">
          404 - Not Found
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Sorry but the page you are looking for does not exist or have been
          removed.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600 flex-col flex">
          You might want to explore{" "}
          <div className="flex items-start justify-center gap-4 mt-4">
            <Link
              href="/"
              className="text-white px-4 py-2 rounded-[16px] hover:scale-105 bg-custom-150"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-white px-4 py-2 rounded-[16px] hover:scale-105 bg-custom-150"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-white px-4 py-2 rounded-[16px] hover:scale-105 bg-custom-150"
            >
              Login
            </Link>
          </div>
          .
        </p>
      </div>
    </FullFlex>
  );
}
