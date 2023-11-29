import cn from "@/utils/Shadcn";
import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

interface LinkBtnProps {
  path: string;
  name: string;
  className?: string;
  children?: ReactNode;
}

const LinkBtn: FunctionComponent<LinkBtnProps> = ({
  path,
  name,
  className,
  children,
}) => {
  return (
    <Link
      href={path}
      className={cn(
        "flex items-center justify-center gap-2 hover:border-b-[1px] hover:border-b-blue-400 hover:text-blue-300",
        className
      )}
    >
      {name} {children}
    </Link>
  );
};

export default LinkBtn;
