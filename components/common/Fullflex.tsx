import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
interface ILinks {
  children?: ReactNode;
  className?: string;
  onClick?: any;
}

export default function FullFlex({ children, className, onClick }: ILinks) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
