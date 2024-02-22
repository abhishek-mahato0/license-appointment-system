"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDown } from "lucide-react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type SearchSelectProps = {
  data: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  btnclassName?: string;
  onSelect: (value: string) => void;
};

export function SearchSelect({
  data,
  placeholder,
  className,
  btnclassName,
  onSelect,
}: SearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [list, setList] = React.useState(data);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full", btnclassName)}
        >
          {value
            ? list.find(
                (framework) =>
                  framework.value.toLowerCase().includes(value.toLowerCase()) ||
                  framework.label.toLowerCase().includes(value.toLowerCase())
              )?.label
            : placeholder}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={` z-[99] bg-custom-50 ${className}`}>
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {list.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onSelect(currentValue);
                  setOpen(false);
                }}
              >
                <span className=" pr-3">{framework.value}. </span>
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
