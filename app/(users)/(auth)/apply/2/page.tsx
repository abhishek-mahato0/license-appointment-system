"use client";
import Category from "@/components/common/Category/Category";
import { useAppSelector } from "@/redux/TypedHooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { isTermsAgreed } = useAppSelector((state) => state.applynew);
  useEffect(() => {
    if (!isTermsAgreed) {
      router.push("/apply/1");
    }
  }, [isTermsAgreed]);
  return (
    <div>
      <Category />
    </div>
  );
}
