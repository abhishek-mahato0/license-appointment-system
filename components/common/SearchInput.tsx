"use client";
import { Cross, SearchIcon, X } from "lucide-react";
import React, { useState } from "react";

type ISearchInput = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange: (e: any) => void;
  onClear: () => void;
};
export default function SearchInput({
  placeholder,
  className,
  onChange,
  onClear,
}: ISearchInput) {
  const [value, setValue] = useState("");
  return (
    <div
      className={`${className} w-[330px] flex justify-between p-2 items-center border-b-[2px] border-gray-400 hover:border-custom-150`}
    >
      <div className="flex items-center w-[80%] gap-3 hover:text-custom-150 text-gray-400">
        <SearchIcon size={26} />
        <input
          value={value}
          type="text"
          placeholder={placeholder || "Search"}
          className="w-full bg-transparent border-none focus:outline-none outline-none border-[0px] placeholder:text-gray-400 focus:text-gray-800 text-[16px] font-[500]"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e);
          }}
        />
      </div>
      {value && (
        <X
          size={20}
          className=" text-gray-600"
          onClick={() => {
            setValue("");
            onClear();
          }}
        />
      )}
    </div>
  );
}
