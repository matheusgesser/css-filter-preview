"use client";

import * as React from "react";
import { BsChevronDown } from "react-icons/bs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function FilterSelect({ filters, handleListFilter }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full flex items-center justify-between bg-white text-black p-2 rounded">
          Select Filter
          <BsChevronDown />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-1">
        <Command>
          <CommandInput placeholder="Search filter..." />
          <CommandEmpty>No filters found.</CommandEmpty>
          <CommandGroup>
            {filters.map((filter) => (
              <CommandItem
                key={filter.value}
                onSelect={() => {
                  handleListFilter(filter.value);
                  setOpen(false);
                }}
              >
                {filter.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
