"use client";

import DeleteModal from "@/components/common/DeleteModal";
import EditIcon from "@/components/common/EditIcon";
import AddQuestionModal from "@/components/common/Examination/AddQuestionModal";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TQuestions } from "@/models/QuestionsModel";
import { apiinstance } from "@/services/Api";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import React, { useEffect } from "react";

export default function page() {
  const [filteredData, setFilteredData] = React.useState([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function deleteQuestion(id: string) {
    try {
      setLoading(true);
      const res = await apiinstance.delete(`/admin/examination/?id=${id}`);
      if (res.status === 200) {
        toast({
          description: "Question deleted successfully",
          title: "Success",
          variant: "success",
        });
        return fetchQuestions();
      }
      return toast({
        description: "Something went wrong",
        title: "Error",
      });
    } catch (error: any) {
      return toast({
        description: error?.response?.data?.message || "Something went wrong",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function editQuestion(data: any) {
    try {
      setLoading(true);
      if (
        !data?.question ||
        !data?.A ||
        !data?.B ||
        !data?.C ||
        !data?.D ||
        !data?.correct_answer ||
        !data?.category ||
        !data?.type
      )
        return toast({
          description: "All fields are required",
          title: "Error",
        });
      const payload = {
        _id: data?._id,
        question: data?.question,
        answers: {
          A: data?.A,
          B: data?.B,
          C: data?.C,
          D: data?.D,
        },
        correct_answer: data?.correct_answer,
        category: data?.category,
        type: data?.type,
        img: data?.img,
      };
      const res = await apiinstance.patch(`/admin/examination/`, payload);
      if (res.status === 200) {
        document.getElementById("close")?.click();
        toast({
          description: "Question updated successfully",
          title: "Success",
          variant: "success",
        });
        return fetchQuestions();
      }
      return toast({
        description: "Something went wrong",
        title: "Error",
      });
    } catch (error: any) {
      return toast({
        description: error?.response?.data?.message || "Something went wrong",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  }
  const columns: ColumnDef<TQuestions>[] = [
    {
      accessorKey: "",
      header: "SN",
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "question",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Question
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
          {row.original?.img && (
            <img
              src={row.original?.img}
              className=" h-[50px] w-[50px] rounded-full"
            />
          )}
          <p>{row.original?.question}</p>
        </div>
      ),
    },
    {
      accessorKey: "correct_answer",
      header: "Correct Answer",
    },
    {
      accessorKey: "answers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" gap-2"
          >
            Options
          </Button>
        );
      },
      cell: ({ row }: any) => (
        <div className=" flex flex-col gap-2">
          {Object.keys(row.original.answers).map((opt) => (
            <p key={opt}>
              {opt}. {row.original.answers[opt]}
            </p>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "type",
      header: "Type",
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
            <AddQuestionModal
              onSubmit={(data) => {
                editQuestion(data);
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
                deleteQuestion(row.original?._id || "");
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

  async function fetchQuestions() {
    try {
      setLoading(true);
      const res = await apiinstance.get("/admin/examination");
      if (res.status === 200) {
        return setQuestions(res.data);
      }
      return setQuestions([]);
    } catch (error: any) {
      return toast({
        description: error?.response?.data.message,
        title: "error",
      });
    } finally {
      setLoading(false);
    }
  }
  async function addQuestion(data: any) {
    try {
      setLoading(true);
      if (
        !data?.question ||
        !data?.A ||
        !data?.B ||
        !data?.C ||
        !data?.D ||
        !data?.correct_answer ||
        !data?.category ||
        !data?.type
      )
        return toast({
          description: "All fields are required",
          title: "Error",
        });
      const payload = {
        question: data?.question,
        answers: {
          A: data?.A,
          B: data?.B,
          C: data?.C,
          D: data?.D,
        },
        correct_answer: data?.correct_answer,
        category: data?.category,
        type: data?.type,
        img: data?.img,
      };
      const res = await apiinstance.post("/admin/examination", payload);
      if (res.status === 201 || res.status === 200) {
        document.getElementById("close")?.click();
        toast({
          description: "Question added successfully",
          title: "Success",
          variant: "success",
        });
        return fetchQuestions();
      }
      return toast({
        description: "Something went wrong",
        title: "Error",
      });
    } catch (error: any) {
      return toast({
        description: error?.response?.data?.message || "Something went wrong",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (searchText.length > 2) {
      const filtered = questions?.filter((office: TQuestions) => {
        return office?.question
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(questions);
    }
  }, [searchText.length > 2]);
  return (
    <div className=" w-full mt-3 flex flex-col pr-6 gap-4">
      <h1>Examination Questions</h1>
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
          <AddQuestionModal
            onSubmit={(data: any) => {
              addQuestion(data);
            }}
            triggerChildren={<Button>Add Questions</Button>}
          />
        </div>
      </div>
      <div className=" w-full mt-3">
        {questions && (
          <TanTable
            columns={columns}
            data={searchText.length > 2 ? filteredData : questions}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
