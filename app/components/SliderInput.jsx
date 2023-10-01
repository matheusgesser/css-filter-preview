import React from "react";
import * as Slider from "@radix-ui/react-slider";

export function SliderInput({ defaultValue, maxValue, handleChangeValue }) {
  return (
    <form>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[defaultValue]}
        max={maxValue}
        step={1}
        onValueChange={handleChangeValue}
      >
        <Slider.Track className="bg-zinc-600 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-white rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white rounded-[10px]"
          aria-label="Range"
        />
      </Slider.Root>
    </form>
  );
}
