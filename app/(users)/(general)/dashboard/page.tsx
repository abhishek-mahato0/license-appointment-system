"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function page() {
  const { data: session } = useSession();
  return (
    <div className="h-[1000px]">
      {session && JSON.stringify(session.user)}
      Dashboard page alsejalsdf asdlkalsdjf aslkdjflkasdjfsa
    </div>
  );
}
