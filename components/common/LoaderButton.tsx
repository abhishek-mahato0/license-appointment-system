import React from "react";
import { Button } from "../ui/button";
import Loader from "./Loader";

export default function LoaderButton({
  children,
  loading = false,
  className,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <Button
      type={type}
      className={`${loading ? "px-5" : ""} ${className}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <Loader width="20" height="20" color="white" type="spinner" />
      ) : (
        children
      )}
    </Button>
  );
}
