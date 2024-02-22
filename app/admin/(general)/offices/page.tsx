"use client";
import AddOfficeModal from "@/components/admin/offices/AddOfficeModal";
import DeleteModal from "@/components/common/DeleteModal";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IOffice } from "@/models/OfficeModel";
import { apiinstance } from "@/services/Api";
import { getDistrictName, getProvinceName } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import React, { useEffect } from "react";

export default function page() {
  const [data, setData] = React.useState<IOffice[]>([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<IOffice[]>([]);

  async function editOffice(id: string, data: IOffice) {
    try {
      const res = await apiinstance.put("/admin/office", {
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
        description: res.data.message || "Something went wrong",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error.message,
      });
    }
  }

  async function deleteOffice(id: string) {
    try {
      const res = await apiinstance.delete(`/admin/office/?id=${id}`);
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
                <Button variant="ghost" onClick={() => {}}>
                  <Pencil size={20} />
                </Button>
              }
              defaultValues={row.original}
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
              <Button variant="ghost" onClick={() => {}}>
                <Trash size={20} />
              </Button>
            </DeleteModal>
          </div>
        );
      },
    },
  ];

  async function addOffice(data: IOffice) {
    try {
      const res = await apiinstance.post("/admin/office", data);
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Office added successfully",
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
        description: error.message,
      });
    }
  }

  async function fetchOffices() {
    try {
      const res = await apiinstance.get("/admin/office");
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
        description: error.message,
      });
    }
  }
  useEffect(() => {
    fetchOffices();
  }, []);
  useEffect(() => {
    if (!data) return;
    if (searchText) {
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
    <div className=" w-full mt-3 flex flex-col pr-6 gap-4">
      <h1>Office List</h1>
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
        </div>
      </div>
      <div className=" w-full mt-3">
        {data && (
          <TanTable columns={columns} data={searchText ? filteredData : data} />
        )}
      </div>
    </div>
  );
}
