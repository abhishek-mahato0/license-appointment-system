"use client";
import { apiinstance } from "@/services/Api";
import { Updatelocalstorage } from "@/utils/Updatelocalstorage";
import { useSession } from "next-auth/react";
import React from "react";

export default function page() {
  const { data: session } = useSession();
  // async function getusers() {
  //   const res = await apiinstance.get("/admin/documents");
  // }
  // getusers();
  return (
    <div className="h-full">
      {session && JSON.stringify(session.user)}
      Dashboard page alsejalsdf asdlkalsdjf aslkdjflkasdjfsa
    </div>
  );
}
