"use client";
import AddModal from "@/components/admin/administrators/AddModal";
import DeleteModal from "@/components/common/DeleteModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import LoaderButton from "@/components/common/LoaderButton";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/TypedHooks";
import { fetchOffices } from "@/redux/slices/officeListSlice";
import { apiinstance } from "@/services/Api";
import { exportasExcel } from "@/utils/ExportasExcel";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Download, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
interface IAdministrator {
  _id?: string;
  name: string;
  username: string;
  password?: string;
  role: string;
  province: number;
  office: Array<any>;
  forgetPasswordToken?: string;
  createdBy: { name: string; _id: string };
}

export default function page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleEdit = async (data: any) => {
    try {
      const res = await apiinstance.patch("/admin/administrators", {
        id: data._id,
        content: data,
      });
      if (res.status === 200) {
        fetchAdmins();
        return toast({
          title: "Success",
          description: "Administrator updated successfully",
          variant: "success",
        });
      }
      return toast({
        title: "Error",
        description: res?.data?.message || "An error occured",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await apiinstance.delete(`/admin/administrators?id=${id}`);
      if (res.status === 200) {
        fetchAdmins();
        return toast({
          title: "Success",
          description: "Administrator deleted successfully.",
        });
      }
      return toast({
        title: "Error",
        description: res?.data?.message || "An error occured",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    }
  };
  async function fetchAdmins() {
    try {
      setLoading(true);
      const res = await apiinstance.get("/admin/administrators");
      if (res.status === 200) {
        return setData(res.data);
      }
      return setData([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAdmins();
    dispatch(fetchOffices());
  }, []);
  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = data?.filter((item: IAdministrator) => {
        return (
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.username.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText.length > 2]);

  const columns: ColumnDef<IAdministrator>[] = [
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
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            User Name
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
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Role
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
      cell({ row }) {
        return (
          <div className="w-full flex flex-col gap-2">
            {row?.original?.office?.map((item: any) => (
              <p>{item?.name || item}</p>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "createdBy",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Created By
            {column.getIsSorted() === "asc" ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </Button>
        );
      },
      cell({ row }) {
        return (
          <div className="w-full flex flex-col gap-2">
            <p>{row?.original?.createdBy?.name || "NA"}</p>
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
            <AddModal
              triggerChildren={
                <Pencil
                  size={20}
                  className=" hover:text-custom-150 hover:scale-105"
                />
              }
              onSubmit={(data: any) => {
                handleEdit(data);
              }}
              defaultValues={row.original}
              type="edit"
            />
            <DeleteModal
              onDelete={() => {
                handleDelete(row.original._id as string);
              }}
              title="Delete Administrator"
            >
              <Trash size={20} className=" text-red-500 hover:scale-105" />
            </DeleteModal>
          </div>
        );
      },
    },
  ];

  const onsubmit = async (data: any) => {
    setLoading(true);
    try {
      if (
        !data.role ||
        !data.name ||
        !data.username ||
        !data.password ||
        !data.office
      )
        return toast({
          title: "Error",
          description: "All fields are required",
        });
      const res = await apiinstance.post("/admin/administrators", data);
      if (res.status === 201) {
        document.getElementById("close")?.click();
        fetchAdmins();
        return toast({
          title: "Success",
          description: "Administrator added successfully",
          variant: "success",
        });
      }
      return toast({
        title: "Error",
        description: res?.data?.message || "An error occured",
      });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col w-full gap-2 mt-1">
      <HeaderTitle title="Administrators" />
      <div className=" w-full items-center justify-between flex pr-6">
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          onClear={() => setSearchText("")}
        />
        <div className=" flex items-center justify-between gap-5">
          <AddModal
            onSubmit={onsubmit}
            addloading={loading}
            triggerChildren={<Button id="popover">Add Administrators</Button>}
          />
          <LoaderButton onClick={() => exportasExcel(data, "Administrator")}>
            Excel file
            <Download size={20} className=" ml-2" />
          </LoaderButton>
        </div>
      </div>
      <div className="w-full flex items-center justify-between pr-7 mt-3">
        {data && (
          <TanTable
            data={searchText.length > 2 ? filteredData : data}
            columns={columns}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
