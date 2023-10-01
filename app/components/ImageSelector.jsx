"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineLink, AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { imageExists } from "../utils/ImageExists";

export function ImageSelector({ changeImage }) {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("ada");

  // Reset error when open/close dialog
  useEffect(() => {
    setError("");
  }, [open]);

  function handleValidateImage(e) {
    e.preventDefault();
    const imageExtensions = [".jpg", ".jpeg", ".png", ".bmp", ".svg", ".webp"];
    const isImage = new RegExp(`(${imageExtensions.join("|")})$`, "i");
    if (!isImage.test(link))
      return setError(
        "Invalid image link (.jpg, .jpeg, .png, .bmp, .svg, .webp)"
      );
    imageExists(link, (exists) => {
      if (exists) {
        changeImage(link);
        setOpen(false);
        return;
      }
      setError("Image not found");
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          tabIndex={0}
          aria-label="Change image"
          className="reveal cursor-pointer opacity-0 hover:opacity-100 transition-opacity absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] p-2 flex justify-center items-end focus:opacity-100"
        >
          <span className="translate-y-10 p-1 px-4">Change image</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">
            Change image
          </Dialog.Title>
          <Dialog.Description className="text-zinc-800 mt-[10px] mb-5 text-[15px] leading-normal">
            Paste the image link
          </Dialog.Description>
          <form onSubmit={handleValidateImage} className="flex flex-col gap-3">
            <input
              className="text-black shadow-zinc-600 focus:shadow-zinc-900 inline-flex w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[16px] py-1 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_1.5px]"
              type="url"
              id="link"
              placeholder="http://..."
              required
              onChange={(e) => setLink(e.target.value)}
            />
            {error && (
              <div className="flex items-center justify-center gap-1 bg-red-800 text-center py-[10px] px-[15px] rounded-[4px] text-md">
                <span>{error}</span>
              </div>
            )}
            <div className="flex justify-end">
              <input
                type="submit"
                value="Save changes"
                className="bg-zinc-800 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] w-full max-w-[180px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none cursor-pointer"
              />
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-zinc-200 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
              aria-label="Close"
            >
              <AiOutlineClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ImageSelector;
