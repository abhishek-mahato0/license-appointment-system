"use client";
import EditModal from "@/components/admin/appointments/EditModal";
import AddOfficeModal from "@/components/admin/offices/AddOfficeModal";
import DeleteModal from "@/components/common/DeleteModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IOffice } from "@/models/OfficeModel";
import { apiinstance } from "@/services/Api";
import { getDistrictName, getProvinceName } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<IRenew[]>([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<IRenew[]>([]);

  async function editRenew(id: string, status: any) {
    setLoading(true);
    try {
      const res = await apiinstance.patch("/admin/renew", {
        id,
        status,
      });
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Office updated successfully",
          variant: "success",
        });
        document.getElementById("close")?.click();
        return fetchRenews();
      }
      return toast({
        title: "Error",
        description: res?.data?.message || "Something went wrong",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: "Error",
      });
    } finally {
      setLoading(false);
    }
  }

  type IRenew = {
    _id: string;
    tracking_id: string;
    province: number;
    office: {
      _id: string;
      name: string;
    };
    date: Date;
    status: string;
    license_no: string;
  };
  const columns: ColumnDef<IRenew>[] = [
    {
      accessorKey: "",
      header: "SN",
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "tracking_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Tracking Number
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
      accessorKey: "province",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Province
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
      accessorKey: "office",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Office
            {column.getIsSorted() === "asc" ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </Button>
        );
      },
      cell: ({ row }: any) => <p>{row.original.office.name}</p>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Status
            {column.getIsSorted() === "asc" ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </Button>
        );
      },
      cell: ({ row }: any) => (
        <Badge
          variant={`${
            row.original.status === "pending"
              ? "secondary"
              : row.original.status === "passed"
              ? "success"
              : "destructive"
          }`}
          className=" cursor-pointer"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <EditModal
          loading={loading}
          triggerChildren={<Pencil size={20} className=" cursor-pointer" />}
          title="Update renew status"
          label="Select Status"
          initialValue={row.original.status}
          onSubmit={(value) => {
            editRenew(row.original._id, value);
          }}
        />
      ),
    },
  ];

  async function fetchRenews() {
    setIsFetching(true);
    try {
      const res = await apiinstance.get("/admin/renew");

      if (res.status === 200) {
        return setData(res.data);
      }
      return toast({
        title: "Error",
        description: "Something went wrong",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data.message,
      });
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    fetchRenews();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (searchText.length > 2) {
      const filtered = data?.filter((office) => {
        return (
          office.tracking_id.toLowerCase().includes(searchText.toLowerCase()) ||
          office.license_no.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      return setFilteredData(filtered);
    }
    return setFilteredData(data);
  }, [searchText.length > 2]);
  return (
    <div className=" w-full flex flex-col pr-6 gap-2">
      <HeaderTitle title="Renew Appointments" />
      <div className=" w-full flex justify-between">
        <SearchInput
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onClear={() => {
            setSearchText("");
          }}
          placeholder="Search office by name or province"
        />
      </div>
      <div className=" w-full mt-3">
        {data && (
          <TanTable
            columns={columns}
            data={searchText ? filteredData : data}
            loading={isFetching}
          />
        )}
      </div>
    </div>
  );
}
