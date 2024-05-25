import { useInView } from "framer-motion";
import React, { useEffect } from "react";

export default function InView({
  className,
  children,
  ref,
}: {
  className?: string;
  children?: React.ReactNode;
  ref?: any;
}) {
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className={className}
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      {children}
    </div>
  );
}
