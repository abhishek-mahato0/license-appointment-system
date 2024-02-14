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

type TPagination = {
  data: Array<{
    id: number;
    page: number;
    href?: string;
    onclick?: () => void;
    active?: boolean;
  }>;
  pathname?: string;
};
export default function PaginationComp({ data, pathname }: TPagination) {
  return (
    <Pagination>
      <PaginationContent>
        {data.map((ele) => {
          return (
            <PaginationItem key={ele.id}>
              <PaginationLink
                onClick={ele.onclick}
                isActive={
                  pathname?.includes(ele?.page.toString()) ? true : false
                }
              >
                {ele.page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}
