import { capitalizeFirstLetter } from "@/utils/convertDate";
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
} from "recharts";

type TBarchart = {
  data: any;
  keys?: Array<string>;
};

const fills = ["#0764D2", "#FF9525", "#FFE28A", "#FFC0CB", "#FF0000"];
export default function MultiBarChart({ data, keys }: TBarchart) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={450} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className=" pt-10" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys?.map((key, index) => {
          return (
            <Bar
              dataKey="data.count"
              fill={fills[index % fills.length]}
              key={key}
              // activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
