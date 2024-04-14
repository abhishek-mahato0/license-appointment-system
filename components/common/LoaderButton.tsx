import React from "react";
import { Button } from "../ui/button";
import Loader from "./Loader";

export default function LoaderButton({
  children,
  loading = false,
  className,
  type = "button",
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "khalti";
}) {
  return (
    <Button
      type={type}
      className={`${loading ? "px-5 cursor-wait" : ""} ${className}`}
      disabled={loading}
      onClick={onClick}
      variant={variant}
    >
      {loading ? (
        <Loader width="20" height="20" color="white" type="spinner" />
      ) : (
        children
      )}
    </Button>
  );
}
