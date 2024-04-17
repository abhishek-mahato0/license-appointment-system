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
import { ChevronDown, ChevronUp, Pencil, RotateCcw } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/TypedHooks";
import {
  setAppointment,
  setPendingAppointment,
} from "@/redux/slices/appointmentSlice";
import HeaderTitle from "@/components/common/HeaderTitle";

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
  const dispatch = useDispatch();
  const { appointments } = useAppSelector((state) => state.appointments);

  async function cancelAppointment(id: string) {
    try {
      if (!id) {
        return toast({
          title: "Id is required",
          variant: "destructive",
        });
      }
      const res = await apiinstance.put(`user/appointments?id=${id}`);
      if (res.status === 200) {
        return toast({
          description: res?.data?.message || "Appointment Cancelled",
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: error?.response?.data?.message,
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
              : row.original.biometric === "passed"
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
                  row.original?.medical.status === "passed"
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
                  row.original?.written?.status === "passed"
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
                  row.original.trial.status === "passed"
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
    {
      header: "Reschedule",
      accessorKey: "",
      cell: ({ row }: any) =>
        row.original.hasOwnProperty("status") &&
        row.original.status === "pending" && (
          <div className=" flex gap-2 justify-between items-center">
            <Pencil
              size={20}
              className=" cursor-pointer hover:scale-105 hover:text-custom-100"
              onClick={() => {
                router.push(`/reschedule/${row.original._id}`);
              }}
            />
            <Button
              variant="destructive"
              onClick={() => cancelAppointment(row.original._id)}
            >
              Cancel
            </Button>
          </div>
          // <RescheduleModal
          //   title="Reschedule Appointment"
          //   label="Reschedule"
          //   initialValue=""
          //   data={{
          //     add_id: row.original._id,
          //     medical: row.original.medical,
          //     written: row.original.written,
          //     trial: row.original.trial,
          //     selectedCat: row.original.category,
          //     selectedOffice: row.original.office,
          //   }}
          //   onSubmit={(value) => {
          //     console.log(value);
          //   }}
          //   triggerChildren={<Button variant="secondary">Reschedule</Button>}
          // />
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

  useEffect(() => {
    dispatch(setAppointment(data));
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-3 md:mt-1 mt-5 pr-5">
      <HeaderTitle title="My Appointments" />

      <div className="w-full">
        {data && <TanTable columns={columns} data={data} loading={loading} />}
      </div>
    </div>
  );
}
