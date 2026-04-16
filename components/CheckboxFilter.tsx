"use client";

import { useState } from "react";
import Done_round from "../public/Done_round.svg";
import Image from "next/image";

const filtered = ["Member of the United Nations", "Independent"];
interface checkboxFilterProps {
  setSortByStatus: (status: string[]) => void;
}

export default function CheckboxFilter({
  setSortByStatus,
}: checkboxFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  function handleonChange(elem: string) {
    const nextStatus = selectedStatus.includes(elem)
      ? selectedStatus.filter((item) => item !== elem)
      : [...selectedStatus, elem];
    setSelectedStatus(nextStatus);
    setSortByStatus(nextStatus);
  }

  return (
    <fieldset className="flex flex-col gap-3 select-none mt-8">
      <legend className="text-xs tracking-tight mb-3">Status</legend>
      {filtered.map((elem) => {
        const isChecked = selectedStatus.includes(elem);
        return (
          <label
            htmlFor={elem}
            className="text-sm -tracking-[0.01em] inline-flex gap-3 items-center"
            key={elem}
          >
            <div>
              <input
                type="checkbox"
                id={elem}
                className="sr-only"
                checked={isChecked}
                onChange={() => handleonChange(elem)}
              />
              <div className="flex w-6 h-6 rounded-sm border-2 border-brand-gray-200">
                {isChecked && (
                  <div className="bg-brand-blue-500">
                    <Image src={Done_round} alt="Expand doww" />
                  </div>
                )}
              </div>
            </div>
            {elem}
          </label>
        );
      })}
    </fieldset>
  );
}
