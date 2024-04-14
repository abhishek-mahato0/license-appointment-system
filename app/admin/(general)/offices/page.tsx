"use client";
import AddOfficeModal from "@/components/admin/offices/AddOfficeModal";
import DeleteModal from "@/components/common/DeleteModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import LoaderButton from "@/components/common/LoaderButton";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IOffice } from "@/models/OfficeModel";
import { apiinstance } from "@/services/Api";
import { getDistrictName, getProvinceName } from "@/utils/common";
import { exportasExcel } from "@/utils/ExportasExcel";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Download, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<IOffice[]>([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<IOffice[]>([]);

  async function editOffice(id: string, data: IOffice) {
    setLoading(true);
    try {
      const res = await apiinstance.put("/admin/offices", {
        id,
        content: data,
      });
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Office updated successfully",
          variant: "success",
        });
        document.getElementById("close")?.click();
        return fetchOffices();
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

  async function deleteOffice(id: string) {
    setLoading(true);
    try {
      const res = await apiinstance.delete(`/admin/offices/?id=${id}`);
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Office deleted successfully",
          variant: "success",
        });

        return fetchOffices();
      }
      return toast({
        title: "Error",
        description: res.data.message || "Something went wrong",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }
  const columns: ColumnDef<IOffice>[] = [
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
      accessorKey: "address",
      header: "Address",
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
      cell: ({ row }: any) => <p>{getProvinceName(row.original.province)}</p>,
    },
    {
      accessorKey: "district",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            District
            {column.getIsSorted() === "asc" ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </Button>
        );
      },
      cell: ({ row }: any) => <p>{getDistrictName(row.original.district)}</p>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <AddOfficeModal
              triggerChildren={
                <Button variant="ghost">
                  <Pencil
                    size={20}
                    className=" hover:text-custom-150 hover:scale-105"
                  />
                </Button>
              }
              defaultValues={row.original}
              loading={loading}
              type="edit"
              onSubmit={(data) => {
                const id = row?.original._id || "id";
                const payload = {
                  ...data,
                  province: parseInt(data.province),
                  district: parseInt(data.district),
                };
                editOffice(id, payload);
              }}
            />
            <DeleteModal
              title={`${row.original.name}`}
              onDelete={() => deleteOffice(row.original._id || "id")}
            >
              <Button variant="ghost">
                <Trash size={20} className=" text-red-700 hover:scale-105" />
              </Button>
            </DeleteModal>
          </div>
        );
      },
    },
  ];

  async function addOffice(data: IOffice) {
    setLoading(true);
    try {
      const res = await apiinstance.post("/admin/offices", data);
      if (res.status === 201) {
        toast({
          title: "Success",
          description: "Office added successfully",
          variant: "success",
        });
        document.getElementById("close")?.click();
        return fetchOffices();
      }
      return toast({
        title: "Error",
        description: "Something went wrong",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }
  async function fetchOffices() {
    setIsFetching(true);
    try {
      const res = await apiinstance.get("/admin/offices/authenticated");

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
    fetchOffices();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (searchText.length > 2) {
      const filtered = data?.filter((office) => {
        return (
          office.name.toLowerCase().includes(searchText.toLowerCase()) ||
          getProvinceName(office.province)
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });
      return setFilteredData(filtered);
    }
    return setFilteredData(data);
  }, [searchText.length > 2]);
  return (
    <div className=" w-full flex flex-col pr-6 gap-2">
      <HeaderTitle title="Transport Offices" />
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
        <div className="flex justify-end gap-4 items-center">
          <AddOfficeModal
            onSubmit={(data) => {
              const payload = {
                ...data,
                province: parseInt(data.province),
                district: parseInt(data.district),
              };
              addOffice(payload);
            }}
            triggerChildren={<Button>Add Offices</Button>}
          />
          <LoaderButton
            onClick={() =>
              exportasExcel(
                filteredData.length > 0 ? filteredData : data,
                "Offices"
              )
            }
          >
            Excel file
            <Download size={20} className=" ml-2" />
          </LoaderButton>
        </div>
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
