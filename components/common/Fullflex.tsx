import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
interface ILinks {
  children?: ReactNode;
  className?: string;
}

export default function FullFlex({ children, className }: ILinks) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      {children}
    </div>
  );
}
