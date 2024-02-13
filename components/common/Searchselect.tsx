"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectScrollableProps = {
  className?: string;
  placeHolder?: string;
  options: Array<any>;
  onSelect: (value: string) => void;
};

export function Searchselect({
  className,
  placeHolder,
  options,
  onSelect,
}: SelectScrollableProps) {
  const [option, setOptions] = React.useState(
    (options.length > 0 && options) || []
  );
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    setOptions(option?.filter((opt) => opt.name === text));
  }, [onSelect, options, text]);
  console.log(option, "option");

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setText(e.target.value)}
            />
          </SelectLabel>
          {option?.map((opt) => (
            <SelectItem key={opt.id} value={opt.value}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
