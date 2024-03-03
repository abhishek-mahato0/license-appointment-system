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
export default function page() {
  const [loading, setLoading] = useState(false);
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
      accessorKey: "tracking_id",
      header: "Tracking ID",
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
      cell: ({ row }: any) => <p> {row.original.office?.name}</p>,
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
      ),
    },
    {
      header: "Medical",
      accessorKey: "medical",
      cell: ({ row }: any) =>
        row.original?.medical?.hasOwnProperty("status") && (
          <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
            <p>
              Status:
              <Badge
                variant={`${
                  row.original?.medical.status === "completed"
                    ? "success"
                    : row.original?.medical.status === "pending"
                    ? "secondary"
                    : "destructive"
                }`}
              >
                {row.original?.medical.status}
              </Badge>
            </p>
            <p>Date: {row.original?.medical.date}</p>
            <p>Shift: {row.original?.medical.shift}</p>
          </div>
        ),
    },

    {
      header: "Written",
      accessorKey: "written",
      cell: ({ row }: any) =>
        row.original.written.hasOwnProperty("status") && (
          <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
            <p>
              Status:
              <Badge
                variant={`${
                  row.original?.written?.status === "completed"
                    ? "success"
                    : row.original?.written?.status === "pending"
                    ? "secondary"
                    : "destructive"
                }`}
              >
                {row.original?.written?.status}
              </Badge>
            </p>
            <p>Date: {row.original.written.date}</p>
            <p>Shift: {row.original.written.shift}</p>
          </div>
        ),
    },
    {
      header: "Trial",
      accessorKey: "trial",
      cell: ({ row }: any) =>
        row.original.written.hasOwnProperty("status") && (
          <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
            <p>
              Status:
              <Badge
                variant={`${
                  row.original.trial.status === "completed"
                    ? "success"
                    : row.original?.trial?.status === "pending"
                    ? "secondary"
                    : "destructive"
                }`}
              >
                {row.original?.trial?.status}
              </Badge>
            </p>
            <p>Date: {row.original?.trial?.date}</p>
            <p>Shift: {row.original?.trial?.shift}</p>
          </div>
        ),
    },
  ];
  async function fetchAppointments(
    selectedCategory: string,
    from: string,
    to: string,
    status: string
  ) {
    setLoading(true);
    try {
      const res = await apiinstance.get(`/user/appointments`);
      if (res.status === 200) {
        return setData(res.data);
      }
      return setData([]);
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response.data.message,
      });
    } finally {
      setLoading(false);
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
            hyujhjkh
          </div>
          <RotateCcw
            className=" text-gray-600"
            onClick={() => fetchAppointments("", "", "", "")}
          />
        </div>
      </div>
      <div className="w-full">
        {data && <TanTable columns={columns} data={data} loading={loading} />}
      </div>
    </div>
  );
}
