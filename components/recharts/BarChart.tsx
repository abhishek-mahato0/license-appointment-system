import { capitalizeFirstLetter } from "@/utils/convertDate";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TBarchart = {
  data: any;
  keys: Array<string>;
};

const fills = ["#0764D2", "#FF9525", "#FFE28A", "#FFC0CB", "#FF0000"];
export default function CustomBarChart({ data, keys }: TBarchart) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={450}
        height={200}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 5,
        //   left: 5,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className=" pt-10" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys?.map((key, index) => {
          return (
            <Bar
              dataKey={key}
              fill={fills[index]}
              key={key}
              // activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
