"use client";
import FilterModal from "@/components/admin/payment/FilterModal";
import HeaderTitle from "@/components/common/HeaderTitle";
import SearchInput from "@/components/common/SearchInput";
import { TanTable } from "@/components/common/TanTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IOffice } from "@/models/OfficeModel";
import { IPayment } from "@/models/paymentModel";
import { apiinstance } from "@/services/Api";
import { getDistrictName, getProvinceName } from "@/utils/common";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<IPayment[]>([]);
  const { toast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState<IPayment[]>([]);

  const columns: ColumnDef<IOffice>[] = [
    {
      accessorKey: "",
      header: "SN",
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "tracking_id",
      header: "Tracking ID",
      cell: ({ row }: any) => <p>{row.original.appointment_id.tracking_id}</p>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "payment_date",
      header: "Payment Date",
      cell: ({ row }: any) => <p>{convertDate(row.original.payment_date)}</p>,
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
    },
    {
      accessorKey: "createdBy",
      header: "Verified By",
      cell: ({ row }: any) => <p>{row.original.verifiedBy.name}</p>,
    },
  ];
  async function fetchPayments(
    from: string,
    to: string,
    status: string,
    gateway: string
  ) {
    setIsFetching(true);
    try {
      const res = await apiinstance.get(
        `/admin/appointments/payment?from=${from}&to=${to}&status=${status}&gateway=${gateway}`
      );

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
    fetchPayments("", "", "", "");
  }, []);

  useEffect(() => {
    if (!data) return;
    if (searchText.length < 3) return;
    const filteredData = data.filter((item: any) =>
      item.appointment_id.tracking_id
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilterData(filteredData);
  }, [searchText]);
  return (
    <div className=" w-full mt-1 flex flex-col pr-6">
      <HeaderTitle title="Payments" />
      <div className=" w-full flex justify-between">
        <div className="w-full flex items-center justify-between gap-2">
          <SearchInput
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onClear={() => {
              setSearchText("");
            }}
          />
          <div className="w-full flex justify-end items-center gap-2">
            <FilterModal onsubmit={fetchPayments} />
          </div>
        </div>
      </div>
      <div className=" w-full mt-3">
        {data && (
          <TanTable
            columns={columns}
            data={searchText.length > 2 ? filterData : data}
            loading={isFetching}
          />
        )}
      </div>
    </div>
  );
}
