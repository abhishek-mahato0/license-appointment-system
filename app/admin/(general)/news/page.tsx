"use client";

import AddNewsModal from "@/components/admin/news/AddNewsModal";
import FilterModal from "@/components/admin/news/FilterModal";
import DeleteModal from "@/components/common/DeleteModal";
import AddQuestionModal from "@/components/common/Examination/AddQuestionModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import LoaderButton from "@/components/common/LoaderButton";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { INews } from "@/models/NewsModel";
import { fetchAdminNews, fetchNews } from "@/redux/slices/newsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { apiinstance } from "@/services/Api";
import { convertDate } from "@/utils/convertDate";
import { exportasExcel } from "@/utils/ExportasExcel";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Download, Pencil, Trash } from "lucide-react";
import React, { useEffect, useMemo } from "react";

export default function page() {
  const [filteredData, setFilteredData] = React.useState([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = React.useState("");
  const [loadings, setLoadings] = React.useState(false);
  const { adminNewsList, loading, error } = useAppSelector(
    (state) => state.news
  );
  const dispatch = useAppDispatch();

  async function editNews(data: any) {
    try {
      setLoadings(true);
      if (!data?._id || !data?.title || !data?.description || !data?.category)
        return toast({
          description: "Invalid News",
          title: "Error",
        });
      const res = await apiinstance.patch(`/admin/news/${data._id}`, {
        title: data?.title,
        description: data?.description,
        category: data?.category,
      });
      if (res.status === 200) {
        toast({
          description: "News edited successfully.",
          title: "Success",
          variant: "success",
        });
        document.getElementById("close")?.click();
        return dispatch(fetchAdminNews({ to: "", from: "", category: "" }));
      }
    } catch (error: any) {
      return toast({
        description: error?.response?.data?.message || "Failed to edit News",
        title: "Error",
      });
    } finally {
      setLoadings(false);
    }
  }

  async function deleteNews(id: string) {
    try {
      setLoadings(true);
      const res = await apiinstance.delete(`/admin/news/${id}`);
      if (res.status === 200) {
        toast({
          description: "News deleted successfully",
          title: "Success",
          variant: "success",
        });
        return dispatch(fetchAdminNews({ to: "", from: "", category: "" }));
      }
    } catch (error: any) {
      return toast({
        description: error?.response?.data?.message || "Failed to delete News",
        title: "Error",
      });
    } finally {
      setLoadings(false);
    }
  }

  async function addNews(data: any) {
    try {
      setLoadings(true);
      const res = await apiinstance.post("/admin/news", data);
      if (res.status === 201) {
        toast({
          description: "News added successfully",
          title: "Success",
          variant: "success",
        });
        document.getElementById("close")?.click();
        return dispatch(fetchAdminNews({ to: "", from: "", category: "" }));
      }
    } catch (error: any) {
      toast({
        description: error?.response?.data?.message || "Failed to add News",
        title: "Error",
      });
    } finally {
      setLoadings(false);
    }
  }

  useEffect(() => {
    if (adminNewsList.length > 0) return;
    dispatch(fetchAdminNews({ to: "", from: "", category: "" }));
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      const data: any = adminNewsList.filter((item) => {
        return item?.title?.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredData(data);
    }
  }, [searchText]);
  const columns: ColumnDef<INews>[] = [
    {
      accessorKey: "",
      header: "SN",
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Title
            {column.getIsSorted() === "asc" ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </Button>
        );
      },
      cell: ({ row }: any) => (
        <div className=" flex items-center gap-3">
          <img
            src={row?.original?.img}
            alt="news"
            className="w-[70px] h-[70px] rounded-full"
          />
          <p>{row.original?.title}</p>
        </div>
      ),
    },
    {
      accessorKey: "Description",
      header: "Description",
      cell: ({ row }: any) => (
        <div className="flex w-[370px]">
          {row.original?.description && (
            <p className=" w-full flex items-center">
              {row.original?.description}
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "date",
      header: "Created Date",
      cell: ({ row }: any) => <p>{convertDate(row.original?.date)}</p>,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }: any) => {
        return <p>{row.original?.createdBy?.name}</p>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <AddNewsModal
              onSubmit={(data) => {
                editNews(data);
              }}
              type="edit"
              defaultValues={row?.original}
              triggerChildren={
                <Pencil
                  size={20}
                  className="hover:text-custom-150 text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                />
              }
            />
            <DeleteModal
              title="Delete news."
              onDelete={() => {
                deleteNews(row?.original?._id as string);
              }}
            >
              <Trash
                size={20}
                className="hover:text-red-700 text-red-400 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
              />
            </DeleteModal>
          </div>
        );
      },
    },
  ];

  const getFilteredData = (from: string, to: string, category: string) => {
    dispatch(fetchAdminNews({ to, from, category }));
  };

  return (
    <div className=" w-full flex flex-col pr-6 gap-1">
      <HeaderTitle title="Posted News" />
      <div className=" w-full flex justify-between">
        <SearchInput
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onClear={() => {
            setSearchText("");
          }}
          placeholder="Search Question"
        />
        <div className="w-[50%] flex justify-end gap-3 items-center">
          <div className="flex">
            <FilterModal onsubmit={getFilteredData} />
          </div>
          <div>
            <AddNewsModal
              onSubmit={(data: any) => {
                addNews(data);
              }}
              triggerChildren={<Button>Add News</Button>}
              loading={loadings}
            />
          </div>
          <LoaderButton
            onClick={() =>
              exportasExcel(
                filteredData.length > 0 ? filteredData : adminNewsList,
                "News"
              )
            }
          >
            Excel file
            <Download size={20} className=" ml-2" />
          </LoaderButton>
        </div>
      </div>
      <div className=" w-full mt-3">
        {adminNewsList && (
          <TanTable
            columns={columns}
            data={searchText.length > 2 ? filteredData : adminNewsList}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
