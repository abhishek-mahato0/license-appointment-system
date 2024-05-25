import React from "react";
import { motion } from "framer-motion";
export default function Appear({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
