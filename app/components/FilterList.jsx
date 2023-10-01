"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { SliderInput } from "@/components/SliderInput";

export function FilterList({ filters, handleUnlistFilter, handleChangeValue }) {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {filters.map((filter) => (
        <li key={filter.value} className="bg-zinc-900 p-2 rounded-md">
          <div className="w-full flex justify-between items-center">
            {filter.label} ({filter.currentValue}
            {filter.unit})
            <button onClick={() => handleUnlistFilter(filter.value)}>
              <AiOutlineDelete />
            </button>
          </div>
          <SliderInput
            defaultValue={filter.defaultValue}
            maxValue={filter.max}
            handleChangeValue={(value) =>
              handleChangeValue(value, filter.value)
            }
          />
        </li>
      ))}
    </ul>
  );
}
