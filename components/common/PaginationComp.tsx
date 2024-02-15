import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

type TPagination = {
  total: number;
  current: number;
  previous: number;
  next: number;
  params: string;
};
export default function PaginationComp({
  total,
  current,
  previous,
  next,
  params,
}: TPagination) {
  const categoryParams = useSearchParams().get("category");
  const typeParams = useSearchParams().get("type");
  const page = useSearchParams().get("page");
  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: total }, (_, i) => i + 1).map((ele) => {
          return (
            <PaginationItem
              key={ele}
              className={`cursor-pointer ${
                ele == current ? "bg-custom-100 text-white" : ""
              }`}
            >
              <PaginationLink
                href={`prepare?category=${categoryParams}&type=${typeParams}&page=${ele.toString()}`}
                isActive={ele == current ? true : false}
              >
                {ele}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}
