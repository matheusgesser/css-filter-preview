"use client";

import Image from "next/image";
import { ImageSelector } from "@/components/ImageSelector";
import { FilterList } from "@/components/FilterList";
import { FilterSelect } from "@/components/FilterSelect";
import { useEffect, useState } from "react";
import { initialState } from "./initialState";
import { copyCssCode } from "../utils/CopyCss";
import { CustomImage } from "@/components/CustomImage";
import { LuX } from "react-icons/lu";

export default function Home() {
  const [filters, setFilters] = useState(initialState);
  const [cssCode, setCssCode] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    let appliedFilters = filters.filter(
      (item) => item.currentValue != item.defaultValue
    );
    let newCss = "";
    appliedFilters.forEach((filter) => {
      newCss = `${newCss} ${filter.value}(${filter.currentValue}${filter.unit})`;
    });
    setCssCode(newCss.trim());
  }, [filters]);

  function handleListFilter(filter) {
    const editIndex = filters.findIndex((item) => item.value == filter);
    let oldFilters = [...filters];
    oldFilters[editIndex] = {
      ...oldFilters[editIndex],
      listing: true,
    };
    setFilters(oldFilters);
  }

  function handleUnlistFilter(filter) {
    const editIndex = filters.findIndex((item) => item.value == filter);
    let oldFilters = [...filters];
    oldFilters[editIndex] = {
      ...oldFilters[editIndex],
      currentValue: oldFilters[editIndex].defaultValue,
      listing: false,
    };
    setFilters(oldFilters);
  }

  function handleChangeValue(value, filter) {
    const editIndex = filters.findIndex((item) => item.value == filter);
    let oldFilters = [...filters];
    oldFilters[editIndex] = {
      ...oldFilters[editIndex],
      currentValue: parseInt(value),
    };
    setFilters(oldFilters);
  }

  function changeImage(link) {
    setImageLink(link);
  }

  return (
    <main className="min-h-screen px-4 py-12 w-full flex flex-col items-center gap-4">
      <h1 className="text-md">Apply CSS Filter</h1>
      <div className="max-w-[480px] max-h-[300px] overflow-hidden relative">
        {imageLink ? (
          <CustomImage link={imageLink} filter={cssCode} />
        ) : (
          <>
            <Image
              // TODO use this as trigger instead of button in imageselector?
              id="preview-img"
              src={"/default.jpg"}
              alt=""
              width={480}
              height={1}
              style={{ width: "100%", height: "100%", filter: cssCode }}
              priority={true}
            />
          </>
        )}
        <ImageSelector changeImage={changeImage} />
      </div>
      <section className="w-full max-w-[30rem] flex flex-col gap-4 items-center relative">
        {imageLink && (
          <div className="flex items-center justify-center gap-1 bg-neutral-900 h-[35px] px-[15px] rounded-[4px] whitespace-nowrap text-xs">
            <span className="w-[90%] overflow-hidden text-ellipsis">
              {imageLink}
            </span>
            <button onClick={() => setImageLink("")} aria-label="Reset image">
              <LuX className="box-content text-red-600 text-xl rounded-full cursor-pointer hover:scale-90" />
            </button>
          </div>
        )}
        {/* Render if there are items listed */}
        {filters.filter((item) => item.listing).length > 0 && (
          <FilterList
            filters={filters.filter((item) => item.listing)}
            handleUnlistFilter={handleUnlistFilter}
            handleChangeValue={handleChangeValue}
          />
        )}
        {/* Render if there are items UNlisted */}
        {filters.filter((item) => !item.listing).length > 0 && (
          <FilterSelect
            filters={filters.filter((item) => !item.listing)}
            handleListFilter={handleListFilter}
          />
        )}
        {/* Render if there are items listed */}
        {filters.filter((item) => item.listing).length > 0 && (
          <button
            className="border border-white py-2 rounded-lg w-full max-w-[150px]"
            onClick={() => copyCssCode(cssCode)}
          >
            Copy CSS
          </button>
        )}
      </section>
    </main>
  );
}
