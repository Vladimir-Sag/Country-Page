"use client";
import { useState } from "react";

const buttonsName = [
  "Americas",
  "Antarctic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];
interface regionButtonProps {
  setSortByRegion: (regions: string[]) => void;
}
export default function RegionButtons({ setSortByRegion }: regionButtonProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function handleOnClick(button: string) {
    const nextSelected = selected.includes(button)
      ? selected.filter((elem) => elem !== button)
      : [...selected, button];
    setSelected(nextSelected);
    setSortByRegion(nextSelected);
  }
  return (
    <fieldset className="mt-8">
      <legend className="text-xs -tracking-[0.035em]">Region</legend>
      <div className="flex flex-wrap gap-3 mt-3">
        {buttonsName.map((button) => (
          <button
            type="button"
            key={button}
            className={`${selected.includes(button) ? "bg-brand-gray-800" : "bg-inherit"} 
                      border-none rounded-xl text-sm -tracking-wide
                      py-1.75 ps-3 pe-3.25`}
            onClick={() => handleOnClick(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
