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
import PaymentModal from "./PaymentModal";
import AddPaymentModal from "./AddPaymentModal";
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
export default function Medical() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function updateBiometricStatus(id: string, status: string) {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  async function updateMedicalStatus(
    id: string,
    status: string,
    type: string,
    app_id: string
  ) {
    setLoading(true);
    try {
      const res = await apiinstance.put(
        `/admin/appointments/update?type=${type}`,
        {
          id,
          status,
          app_id,
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
    } finally {
      setLoading(false);
    }
  }

  async function updatePayment(id: string, status: string) {
    try {
      setLoading(true);
      const res = await apiinstance.patch(
        `/admin/appointments/payment?id=${id}`,
        { status }
      );
      if (res.status === 200) {
        document.getElementById("close")?.click();
        return toast({
          title: "Success",
          description: "Payment status updated successfully.",
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    } finally {
      setLoading(false);
    }
  }
  async function addPayment(id: string) {
    try {
      setLoading(true);
      const res = await apiinstance.post(`/admin/appointments/payment`, {
        app_id: id,
      });
      if (res.status === 200) {
        document.getElementById("close")?.click();
        return toast({
          title: "Success",
          description: "Payment status updated successfully.",
          variant: "success",
        });
      }
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occured",
      });
    } finally {
      setLoading(false);
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
      accessorKey: "tracking_id",
      header: "Tracking ID",
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
      cell: ({ row }: any) =>
        row?.original?.payment?.payment_status ? (
          <PaymentModal
            loading={loading}
            triggerChildren={
              <Badge
                variant={`${
                  row.original?.payment?.payment_status === "pending"
                    ? "secondary"
                    : row.original?.payment?.payment_status === "completed"
                    ? "success"
                    : "destructive"
                }`}
                className=" cursor-pointer"
              >
                {row.original?.payment?.payment_status || "No Payment"}
              </Badge>
            }
            title="Update Payment Status"
            label="Select Status"
            initialValue={row.original?.payment?.payment_status || "pending"}
            onSubmit={(value) => {
              updatePayment(row.original?.payment?._id, value);
            }}
          />
        ) : (
          <AddPaymentModal
            loading={loading}
            triggerChildren={
              <Badge
                variant={`${
                  row.original?.payment?.payment_status === "pending"
                    ? "secondary"
                    : row.original?.payment?.payment_status === "completed"
                    ? "success"
                    : "destructive"
                }`}
                className="cursor-pointer"
              >
                {row.original?.payment?.payment_status || "No"}
              </Badge>
            }
            title="Make Payment"
            onSubmit={() => {
              addPayment(row.original._id);
            }}
          />
        ),
    },
    {
      header: "Biometric",
      accessorKey: "biometric",
      cell: ({ row }: any) => (
        <EditModal
          loading={loading}
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
          {row.original.medical?.hasOwnProperty("status") && (
            <EditModal
              loading={loading}
              triggerChildren={
                <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
                  <p>
                    Status:
                    <Badge
                      variant={`${
                        row.original.medical?.status === "completed"
                          ? "success"
                          : row.original.medical?.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }`}
                    >
                      {row.original.medical?.status}
                    </Badge>
                  </p>
                  <p>Date: {row.original.medical?.date}</p>
                  <p>Shift: {row.original.medical?.shift}</p>
                </div>
              }
              title="Update Medical Status"
              label="Select Status"
              initialValue={row.original.medical?.status}
              onSubmit={(value) => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 3);
                if (
                  row.original.medical?.date < convertDate(new Date()) &&
                  row.original.medical?.date > convertDate(futureDate)
                ) {
                  return toast({
                    title: "Error",
                    description: "You can't update a past date",
                  });
                }
                updateMedicalStatus(
                  row.original.medical?._id,
                  value,
                  "medical",
                  row.original._id
                );
                fetchAppointments("", "", "", "");
              }}
            />
          )}
        </div>
      ),
    },
    {
      header: "Trial",
      accessorKey: "trial",
      cell: ({ row }: any) =>
        row.original?.trial?.hasOwnProperty("status") && (
          <EditModal
            loading={loading}
            triggerChildren={
              <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
                <p>
                  Status:
                  <Badge
                    variant={`${
                      row.original?.trial?.status === "completed"
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
            }
            title="Update Trial Status"
            label="Select Status"
            initialValue={row.original?.trial?.status}
            onSubmit={(value) => {
              const futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + 3);
              if (
                row.original?.trial?.date < convertDate(new Date()) &&
                row.original?.trial?.date > convertDate(futureDate)
              ) {
                return toast({
                  title: "Error",
                  description: "You can't update a past date",
                });
              }
              updateMedicalStatus(
                row.original?.trial?._id,
                value,
                "trial",
                row?.original?._id
              );
              fetchAppointments("", "", "", "");
            }}
          />
        ),
    },
    {
      header: "Written",
      accessorKey: "written",
      cell: ({ row }: any) =>
        row?.original?.written?.hasOwnProperty("status") && (
          <EditModal
            loading={loading}
            triggerChildren={
              <div className=" w-full flex flex-col gap-[2px] cursor-pointer hover:scale-105">
                <p>
                  Status:
                  <Badge
                    variant={`${
                      row?.original?.written?.status === "completed"
                        ? "success"
                        : row?.original?.written?.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }`}
                  >
                    {row?.original?.written?.status}
                  </Badge>
                </p>
                <p>Date: {row?.original?.written?.date}</p>
                <p>Shift: {row?.original?.written?.shift}</p>
              </div>
            }
            title="Update Written Status"
            label="Select Status"
            initialValue={row?.original?.written?.status}
            onSubmit={(value) => {
              const futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + 3);
              if (
                row?.original?.written?.date < convertDate(new Date()) &&
                row?.original?.written?.date > convertDate(futureDate)
              ) {
                return toast({
                  title: "Error",
                  description: "You can't update a past date",
                });
              }
              updateMedicalStatus(
                row?.original?.written?._id,
                value,
                "written",
                row?.original?._id
              );
              fetchAppointments("", "", "", "");
            }}
          />
        ),
    },
  ];
  async function fetchAppointments(
    selectedCategory: string,
    from: string,
    to: string,
    status: string
  ) {
    setIsFetching(true);
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
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    fetchAppointments("", "", "", "");
  }, []);

  return (
    <div className="w-full flex flex-col pr-5">
      <HeaderTitle title="Appointments" />
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
      <div className="w-full mt-2">
        {data && (
          <TanTable columns={columns} data={data} loading={isFetching} />
        )}
      </div>
    </div>
  );
}
