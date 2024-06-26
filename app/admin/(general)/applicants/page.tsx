"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Download, Eye } from "lucide-react";
import { TanTable } from "@/components/common/TanTable";
import SearchInput from "@/components/common/SearchInput";
import { apiinstance } from "@/services/Api";
import { IUser } from "@/models/userModel";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import HeaderTitle from "@/components/common/HeaderTitle";
import FilterModal from "@/components/admin/applicants/FilterModal";
import LoaderButton from "@/components/common/LoaderButton";
import { exportasExcel } from "@/utils/ExportasExcel";

export default function page() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [data, setData] = React.useState<IUser[]>([]);
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  const handleClear = () => {
    setSearchText("");
  };
  const columns: ColumnDef<IUser>[] = [
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
      accessorKey: "phone",
      header: "Phone",
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
            Verified By Email
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
      accessorKey: "documentVerified",
      header: "Document Status",
      cell: ({ row }: any) => {
        return (
          <div className="w-full flex items-center gap-2">
            <Badge
              variant={`${
                row?.original?.documentVerified?.status === "verified"
                  ? "success"
                  : "destructive"
              }`}
            >
              {row?.original.documentVerified?.status}
            </Badge>
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

  async function getApplicants(
    applied: string,
    byemail: string,
    status: string
  ) {
    try {
      setLoading(true);
      const res = await apiinstance.get(
        `/admin/users?byemail=${byemail}&applied=${applied}&status=${status}`
      );
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
    } finally {
      setLoading(false);
    }
  }
  useMemo(() => {
    getApplicants("", "", "");
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
    <div className="w-full flex flex-col gap-2 mt-1">
      <HeaderTitle title="Applicants" />
      <div className="w-full flex justify-between items-center pr-3">
        <SearchInput onChange={handleSearch} onClear={handleClear} />
        <div className="flex items-center justify-end gap-3 w-1/2">
          <FilterModal onsubmit={getApplicants} />
          <LoaderButton onClick={() => exportasExcel(data, "Applicants")}>
            Excel file
            <Download size={20} className=" ml-2" />
          </LoaderButton>
        </div>
      </div>
      <div className="w-full flex justify-end items-center pr-6 py-2">
        {(searchText ? filteredData : data) && (
          <TanTable
            columns={columns}
            data={searchText ? filteredData : data}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
