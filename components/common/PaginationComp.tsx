import React, { Suspense, useState } from "react";
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
export default function PaginationComp({ total, current }: TPagination) {
  const categoryParams = useSearchParams().get("category");
  const typeParams = useSearchParams().get("type");
  const [page, setPage] = useState(useSearchParams().get("page"));
  return (
    <Suspense>
      <Pagination className=" w-fit mt-4 mb-7">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`prepare?category=${categoryParams}&type=${typeParams}&page=${
                Number(page) - 1 > 0 ? Number(page) - 1 : 1
              }`}
            />
          </PaginationItem>
          <PaginationItem
            className={`cursor-pointer 
            ${
              page == "1"
                ? "bg-custom-100 text-white"
                : " border-2 border-custom-100 bg-white text-custom-100 hover:scale-105"
            }
            `}
          >
            <PaginationLink
              href={`prepare?category=${categoryParams}&type=${typeParams}&page=1`}
              isActive={page == "1" ? true : false}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            className={`cursor-pointer 
            ${
              page == "2"
                ? "bg-custom-100 text-white"
                : " border-2 border-custom-100 bg-white text-custom-100 hover:scale-105"
            }
            `}
          >
            <PaginationLink
              href={`prepare?category=${categoryParams}&type=${typeParams}&page=2`}
              isActive={page == "2" ? true : false}
            >
              2
            </PaginationLink>
          </PaginationItem>
          {page != "1" && page != "2" && page != String(total) && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem
                className={`cursor-pointer 
            ${
              page != "2" && page != String(total) && page != "1"
                ? "bg-custom-100 text-white"
                : " border-2 border-custom-100 bg-white text-custom-100 hover:scale-105"
            }
            `}
              >
                <PaginationLink
                  href={`prepare?category=${categoryParams}&type=${typeParams}&page=${page}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {total > 2 && (
            <PaginationItem
              className={`cursor-pointer 
            ${
              page === String(total)
                ? "bg-custom-100 text-white"
                : " border-2 border-custom-100 bg-white text-custom-100 hover:scale-105"
            }
            `}
            >
              <PaginationLink
                href={`prepare?category=${categoryParams}&type=${typeParams}&page=${total}`}
              >
                {total}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={`prepare?category=${categoryParams}&type=${typeParams}&page=${
                Number(page) + 1 > total ? total : Number(page) + 1
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Suspense>
  );
}
