"use client";
import { TanTable } from "@/components/common/TanTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IMedicalSchema } from "@/models/MedicalExamModel";
import { ITrailSchema } from "@/models/TrialExamModel";
import { IWrittenSchema } from "@/models/WrittenExamModel";
import { IPayment } from "@/models/paymentModel";
import { apiinstance } from "@/services/Api";
import { convertDate } from "@/utils/convertDate";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import FilterModal from "./FilterModal";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import { ColumnDef } from "@tanstack/react-table";

type AppointmentColumn = {
  _id?: string;
  category: string;
  bookDate: Date;
  type: string;
  office: string;
  province: number;
  status: string;
  payment?: IPayment;
  biometric: string;
  medical: Array<IMedicalSchema>;
  trial: Array<ITrailSchema>;
  written: Array<IWrittenSchema>;
};
export default function Medical() {
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState([]);

  async function updateBiometricStatus(id: string, status: string) {
    try {
      const res = await apiinstance.put(`/admin/appointments?id=${id}`, {
        status,
      });
      if (res.status === 200) {
        document.getElementById("close")?.click();
        return toast({
          title: "Success",
          description: "Biometric status updated successfully.",
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
  }
  async function updateMedicalStatus(id: string, status: string, type: string) {
    try {
      const res = await apiinstance.put(
        `/admin/appointments/update?type=${type}`,
        {
          id,
          status,
        }
      );
      if (res.status === 200) {
        document.getElementById("close")?.click();
        return toast({
          title: "Success",
          description: "Medical status updated successfully.",
          variant: "success",
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
  }
  const columns: ColumnDef<AppointmentColumn>[] = [
    {
      header: "SN",
      accessorKey: "",
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <p
            //variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-1 w-fit"
          >
            Category
            {column.getIsSorted() === "asc" ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </p>
        );
      },
    },
    {
      header: "Book Date",
      accessorKey: "bookDate",
      cell: ({ row }: any) => <p> {convertDate(row.original.bookDate)}</p>,
    },
    {
      header: "Type",
      accessorKey: "type",
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
    },
    {
      header: "Province",
      accessorKey: "province",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Payment",
      accessorKey: "payment",
      cell: ({ row }: any) => row.original?.payment?.status || "No Payment",
    },
    {
      header: "Biometric",
      accessorKey: "biometric",
      cell: ({ row }: any) => (
        <EditModal
          triggerChildren={
            <Badge
              variant={`${
                row.original.biometric === "pending"
                  ? "secondary"
                  : row.original.biometric === "completed"
                  ? "success"
                  : "destructive"
              }`}
              className=" cursor-pointer"
            >
              {row.original.biometric}
            </Badge>
          }
          title="Update Biometric Status"
          label="Select Status"
          initialValue={row.original.biometric}
          onSubmit={(value) => {
            updateBiometricStatus(row.original._id, value);
          }}
        />
      ),
    },
    {
      header: "Medical",
      accessorKey: "medical",
      cell: ({ row }: any) => (
        <div className=" w-full flex flex-col gap-3">
          {row.original.medical.map((item: IMedicalSchema) => (
            <EditModal
              triggerChildren={
                <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
                  <p>
                    Status:
                    <Badge
                      variant={`${
                        item.status === "completed"
                          ? "success"
                          : item.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </p>
                  <p>Date: {item.date}</p>
                  <p>Shift: {item.shift}</p>
                </div>
              }
              title="Update Medical Status"
              label="Select Status"
              initialValue={item.status}
              onSubmit={(value) => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 3);
                if (
                  item.date < convertDate(new Date()) &&
                  item.date > convertDate(futureDate)
                ) {
                  return toast({
                    title: "Error",
                    description: "You can't update a past date",
                  });
                }
                updateMedicalStatus(item._id, value, "medical");
              }}
            />
          ))}
        </div>
      ),
    },
    {
      header: "Trial",
      accessorKey: "trial",
      cell: ({ row }: any) =>
        row.original.trial.map((item: IMedicalSchema) => (
          <EditModal
            triggerChildren={
              <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
                <p>
                  Status:
                  <Badge
                    variant={`${
                      item.status === "completed"
                        ? "success"
                        : item.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </p>
                <p>Date: {item.date}</p>
                <p>Shift: {item.shift}</p>
              </div>
            }
            title="Update Trial Status"
            label="Select Status"
            initialValue={item.status}
            onSubmit={(value) => {
              const futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + 3);
              if (
                item.date < convertDate(new Date()) &&
                item.date > convertDate(futureDate)
              ) {
                return toast({
                  title: "Error",
                  description: "You can't update a past date",
                });
              }
              updateMedicalStatus(item._id, value, "trial");
            }}
          />
        )),
    },
    {
      header: "Written",
      accessorKey: "written",
      cell: ({ row }: any) =>
        row.original.written.map((item: IMedicalSchema) => (
          <EditModal
            triggerChildren={
              <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
                <p>
                  Status:
                  <Badge
                    variant={`${
                      item.status === "completed"
                        ? "success"
                        : item.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </p>
                <p>Date: {item.date}</p>
                <p>Shift: {item.shift}</p>
              </div>
            }
            title="Update Written Status"
            label="Select Status"
            initialValue={item.status}
            onSubmit={(value) => {
              const futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + 3);
              if (
                item.date < convertDate(new Date()) &&
                item.date > convertDate(futureDate)
              ) {
                return toast({
                  title: "Error",
                  description: "You can't update a past date",
                });
              }
              updateMedicalStatus(item._id, value, "written");
            }}
          />
        )),
    },
  ];
  async function fetchAppointments(
    selectedCategory: string,
    from: string,
    to: string,
    status: string
  ) {
    try {
      const res = await apiinstance.get(
        `/admin/appointments?category=${selectedCategory}&status=${status}`
      );
      if (res.status === 200) {
        return setData(res.data);
      }
      return setData([]);
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response.data.message,
      });
    }
  }
  useEffect(() => {
    fetchAppointments("", "", "", "");
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 mt-4 pr-5">
      <h1 className=" text-2xl text-custom-150 font-bold">
        Medical Appointments
      </h1>
      <div className="w-full flex items-center justify-between">
        <SearchInput onClear={() => {}} onChange={() => {}} />
        <div className="w-full flex items-center gap-2">
          <div className="w-full flex justify-end items-center gap-2">
            <FilterModal onsubmit={fetchAppointments} />
          </div>
          <RotateCcw
            className=" text-gray-600"
            onClick={() => fetchAppointments("", "", "", "")}
          />
        </div>
      </div>
      <div className="w-full">
        {data && <TanTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
