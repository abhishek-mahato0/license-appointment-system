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
};
export default function SingleSelect({
  data,
  onSelect,
  placeholder,
  classNames,
}: TOffice) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className={classNames}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
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
