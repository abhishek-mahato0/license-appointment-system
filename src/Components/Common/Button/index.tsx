import cn from "@/utils/Shadcn";
import { FunctionComponent, ReactNode } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  children?: ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  className,
  children,
}) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 w-fit px-4 py-2 text-white bg-blue-500 hover:scale-105",
        className
      )}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
