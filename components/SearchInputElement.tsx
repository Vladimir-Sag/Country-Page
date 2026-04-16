"use client";
import React, { useState, useRef } from "react";
import Search from "../public/Search.svg";
import Image from "next/image";

interface SearchProps {
  setSearchElement: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchInputElement({ setSearchElement }: SearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  function handleContainerClick() {
    inputRef.current?.focus();
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentResult = e.target.value;
    setValue(currentResult);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchElement(currentResult.trim());
    }, 500);
  }
  return (
    <div
      className="relative w-full lg:w-85.25 lg:-translate-y-px"
      onClick={handleContainerClick}
    >
      {!isFocused && (
        <div
          className="flex gap-2.75 w-3/5 absolute  left-13.25 bottom-2 
            lg:left-2 lg:bottom-2.5 lg:w-full items-center lg:gap-3"
        >
          <Image
            src={Search}
            alt="Seacrh"
            className="-translate-y-0.5 lg:translate-y-0"
            width={24}
            height={24}
          />
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-sm letter -tracking-[0.005em]">
            Search by Name, Region, Subregion
          </p>
        </div>
      )}
      <input
        aria-label="Search by Name, Region, Subregion"
        title="Search countries"
        type="text"
        className="w-full h-11 bg-brand-gray-800 border-none rounded-xl px-4 box-border"
        ref={inputRef}
        value={value}
        onChange={(e) => handleOnChange(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.target.value === "") setIsFocused(false);
        }}
      />
    </div>
  );
}
