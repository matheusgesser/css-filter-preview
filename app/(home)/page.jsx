"use client";

import Image from "next/image";
import { ImageSelector } from "@/components/ImageSelector";
import { FilterList } from "@/components/FilterList";
import { FilterSelect } from "@/components/FilterSelect";
import { useState } from "react";
import { copyCssCode } from "../utils/CopyCss";
import { CustomImage } from "@/components/CustomImage";
import { LuX } from "react-icons/lu";
import { useFilters } from "@/hooks/useFilters";

export default function Home() {
  const [imageLink, setImageLink] = useState("");
  const {
    cssCode,
    listedItems,
    unlistedItems,
    handleListFilter,
    handleUnlistFilter,
    handleChangeFilterValue,
   } = useFilters();

  const changeImage = (link) => {
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
        {listedItems && (
          <FilterList
            filters={listedItems}
            handleUnlistFilter={handleUnlistFilter}
            handleChangeValue={handleChangeFilterValue}
          />
        )}
        {unlistedItems && (
          <FilterSelect
            filters={unlistedItems}
            handleListFilter={handleListFilter}
          />
        )}
        {listedItems && (
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
