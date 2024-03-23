"use client";

import AddNewsModal from "@/components/admin/news/AddNewsModal";
import DeleteModal from "@/components/common/DeleteModal";
import AddQuestionModal from "@/components/common/Examination/AddQuestionModal";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { INews } from "@/models/NewsModel";
import { fetchNews } from "@/redux/slices/newsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { apiinstance } from "@/services/Api";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import React, { useEffect, useMemo } from "react";

export default function page() {
  const [filteredData, setFilteredData] = React.useState([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = React.useState("");
  const [loadings, setLoadings] = React.useState(false);
  const { newsList, loading, error } = useAppSelector((state) => state.news);
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
          description: "News edited successfully",
          title: "Success",
          variant: "success",
        });
        document.getElementById("close")?.click();
        return dispatch(fetchNews());
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
        return dispatch(fetchNews());
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
        return dispatch(fetchNews());
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
    if (newsList.length > 0) return;
    dispatch(fetchNews());
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      const data: any = newsList.filter((item) => {
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
        <div className=" flex flex-col gap-2">
          {row.original?.description && <p>{row.original?.description}</p>}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
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
              defaultValues={row.original}
              triggerChildren={
                <Pencil
                  size={20}
                  className="hover:text-custom-150 text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                />
              }
            />
            <DeleteModal
              title="this question."
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

  return (
    <div className=" w-full mt-3 flex flex-col pr-6 gap-4">
      <h1>News</h1>
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
        <div className="flex justify-end gap-4 items-center">
          <AddNewsModal
            onSubmit={(data: any) => {
              addNews(data);
            }}
            triggerChildren={<Button>Add Questions</Button>}
            loading={loadings}
          />
        </div>
      </div>
      <div className=" w-full mt-3">
        {newsList && (
          <TanTable
            columns={columns}
            data={searchText.length > 2 ? filteredData : newsList}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
