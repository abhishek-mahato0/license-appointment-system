import { capitalizeFirstLetter } from "@/utils/convertDate";
import { Item } from "@radix-ui/react-select";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type TBarchart = {
  data: any;
  keys?: Array<string>;
};

const fills = ["#0764D2", "#FF9525", "#FFE28A", "#FFC0CB", "#FF0000"];
export default function AdminBarChart({ data, keys }: TBarchart) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={450} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className=" pt-10" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#0764D2">
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={fills[index % fills.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
