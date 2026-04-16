"use client";
import SearchInputElement from "@/components/SearchInputElement";
import SelectMenuElement from "@/components/SelectMenuElement";
import RegionButtons from "@/components/RegionButtons";
import CheckboxFilter from "@/components/CheckboxFilter";
import CountryList from "@/components/CountryList";
import { useState } from "react";

export default function Home() {
  const [totalCountries, setTotalCountries] = useState<number>(0);
  const [searchElement, setSearchElement] = useState<string | null>(null);
  const [sortByCategory, setSortByCategory] = useState<
    "name" | "population" | "area"
  >("population");
  const [sortByRegion, setSortByRegion] = useState<string[]>([]);
  const [sortByStatus, setSortByStatus] = useState<string[]>([]);
  return (
    <main className="p-3 lg:px-8">
      <div
        className="border border-brand-gray-800 rounded-xl grid
        bg-brand-gray-900 py-4.5 px-2.75 h-323.5 lg:h-223 overflow-hidden
        lg:grid-cols-[auto_2fr] lg:py-6 lg:px-7.75 lg:items-start lg:grid-rows-[43px_1fr]
        lg:gap-x-8"
      >
        <div>
          <h1 className="mt-2.25 mb-7">Found {totalCountries} countries</h1>
        </div>
        <div className="lg:ms-auto">
          <SearchInputElement setSearchElement={setSearchElement} />
        </div>
        <aside className="flex flex-col lg:w-65.25">
          <SelectMenuElement setSortByCategory={setSortByCategory} />
          <RegionButtons setSortByRegion={setSortByRegion} />
          <CheckboxFilter setSortByStatus={setSortByStatus} />
        </aside>
        <div className="lg:mt-1 h-full overflow-y-auto ">
          <CountryList
            setTotalCountries={setTotalCountries}
            searchElement={searchElement}
            sortByCategory={sortByCategory}
            sortByRegion={sortByRegion}
            sortByStatus={sortByStatus}
          />
        </div>
      </div>
    </main>
  );
}
