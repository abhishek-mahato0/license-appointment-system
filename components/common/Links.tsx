import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";
interface ILinks {
  name: string;
  href: string;
  children?: ReactNode;
  className?: string;
  rightChildren?: boolean;
  onClick?: any;
}

export default function Links({
  name,
  href,
  children,
  className,
  rightChildren,
  onClick,
}: ILinks) {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-1 justify-center items-center w-fit px-3 py-1",
        className
      )}
      onClick={onClick}
    >
      {!rightChildren && children}
      {name}
      {rightChildren && children}
    </Link>
  );
}
