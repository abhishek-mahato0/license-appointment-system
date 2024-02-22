"use client";
import React, { useEffect, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Delete,
  Edit,
  Eye,
  Pencil,
  Trash,
} from "lucide-react";
import { TanTable } from "@/components/common/TanTable";
import SearchInput from "@/components/common/SearchInput";
import { apiinstance } from "@/services/Api";
import { IUser } from "@/models/userModel";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "",
    header: "SN",
    cell: ({ row }: any) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" gap-2"
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronUp size={20} />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" gap-2"
        >
          Email
          {column.getIsSorted() === "asc" ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronUp size={20} />
          )}
        </Button>
      );
    },
    cell: (row: any) => {
      return (
        <div className=" flex items-start gap-4">
          <img
            src={row.row.original?.avatar || "/images/bike.svg"}
            className="w-10 h-10 rounded-full object-cover"
            alt="profile"
          />
          <span>{row.getValue()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isverifiedByEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" gap-2"
        >
          Verified
          {column.getIsSorted() === "asc" ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronUp size={20} />
          )}
        </Button>
      );
    },
    cell(row: any) {
      return (
        <div className="w-full flex items-center gap-2">
          {row.getValue() ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "hasApplied",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" gap-2"
        >
          Has Applied
          {column.getIsSorted() === "asc" ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronUp size={20} />
          )}
        </Button>
      );
    },
    cell(row: any) {
      return (
        <div className="w-full flex items-center gap-2">
          {row.getValue() ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className=" w-full flex items-center gap-5 cursor-pointer text-gray-500">
          <Link href={`applicants/${row.original._id}`}>
            <Eye size={25} />
          </Link>
        </div>
      );
    },
  },
];

export default function page() {
  const { toast } = useToast();
  const [data, setData] = React.useState<IUser[]>([]);
  const [filteredData, setFilteredData] = React.useState<IUser[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  const handleClear = () => {
    setSearchText("");
  };
  async function getApplicants() {
    try {
      const res = await apiinstance.get("/admin/users");
      if (res.status === 200) {
        return setData(res.data);
      }
      return toast({
        title: "Error",
        description: res?.data?.message,
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    }
  }
  useMemo(() => {
    getApplicants();
  }, []);
  useEffect(() => {
    if (searchText) {
      const filtered = data.filter((ele) => {
        return (
          ele.name.toLowerCase().includes(searchText.toLowerCase()) ||
          ele.email.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText]);
  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      <h1>Applicants</h1>
      <div className="w-full flex justify-between items-center">
        <SearchInput onChange={handleSearch} onClear={handleClear} />
        {/* <Button>Add New Applicant</Button> */}
      </div>
      <div className="w-full flex justify-end items-center pr-6 py-2">
        {(searchText ? filteredData : data) && (
          <TanTable columns={columns} data={searchText ? filteredData : data} />
        )}
      </div>
    </div>
  );
}
