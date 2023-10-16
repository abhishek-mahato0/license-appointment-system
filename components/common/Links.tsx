import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";
interface ILinks {
  name: string;
  href: string;
  children?: ReactNode;
  className?: string;
  rightChildren?: boolean;
}

export default function Links({
  name,
  href,
  children,
  className,
  rightChildren,
}: ILinks) {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-1 justify-center items-center w-fit px-3 py-1",
        className
      )}
    >
      {!rightChildren && children}
      {name}
      {rightChildren && children}
    </Link>
  );
}
