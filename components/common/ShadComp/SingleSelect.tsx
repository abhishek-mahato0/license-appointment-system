import React from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Tdata = {
  id: number;
  name: string;
  value: string;
};
type TOffice = {
  data: Array<Tdata>;
  onSelect: any;
  placeholder: string;
  classNames?: string;
  all?: boolean;
  value?: string;
};
export default function SingleSelect({
  data,
  onSelect,
  placeholder,
  classNames,
  all = false,
  value,
}: TOffice) {
  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger className={classNames}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {all && (
          <div className=" hover:bg-custom-100 hover:text-white">
            <SelectItem value="all">All</SelectItem>
          </div>
        )}
        {data.map((ele) => {
          return (
            <div className=" hover:bg-custom-100 hover:text-white" key={ele.id}>
              <SelectItem value={ele.value}>{ele.name}</SelectItem>
            </div>
          );
        })}
      </SelectContent>
    </Select>
  );
}
