"use client";
import { useEffect, useMemo, useState } from "react";
import TableSkeleton from "./TableSkeleton";
import TableResults from "./TableResults";
import { Country } from "@/types/country";
const fields = [
  "name",
  "population",
  "flags",
  "area",
  "region",
  "subregion",
  "independent",
  "unMember",
  "cca3",
].join(",");

interface CountryListProps {
  setTotalCountries: React.Dispatch<React.SetStateAction<number>>;
  searchElement: string | null;
  sortByCategory: "name" | "population" | "area";
  sortByRegion: string[];
  sortByStatus: string[];
}
const url = "https://restcountries.com/v3.1/all";
export default function CountryList({
  setTotalCountries,
  searchElement,
  sortByCategory,
  sortByRegion,
  sortByStatus,
}: CountryListProps) {
  const [result, setResult] = useState<Country[] | null>(null);

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;
    async function fetchData() {
      try {
        const res = await fetch(`${url}?fields=${fields}`, { signal });
        if (!res.ok) throw new Error("Error connecting to API");
        const data: Country[] = await res.json();
        const lenght: number = data.length || 0;
        setTotalCountries(lenght);
        setResult(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") return;
          console.error(err.message);
        }
      }
    }
    fetchData();
    return () => controler.abort();
  }, [url]);

  const filtredResult = useMemo(() => {
    if (!result) return null;
    const lowerSearchElem = searchElement?.toLowerCase() || "";
    let filtredData = [];
    if (!lowerSearchElem) filtredData = [...result];
    else {
      filtredData = result.filter(
        (elem) =>
          elem.name.common.toLowerCase().includes(lowerSearchElem) ||
          elem.region.toLowerCase().includes(lowerSearchElem) ||
          elem.subregion.toLowerCase().includes(lowerSearchElem),
      );
    }
    if (sortByRegion.length > 0) {
      filtredData = filtredData.filter((country) =>
        sortByRegion.includes(country.region),
      );
    }
    if (sortByStatus.length > 0) {
      if (sortByStatus.includes("Independent"))
        filtredData = filtredData.filter(
          (country) => country.independent === true,
        );
      if (sortByStatus.includes("Member of the United Nations"))
        filtredData = filtredData.filter(
          (country) => country.unMember === true,
        );
    }
    return filtredData.sort((a, b) => {
      switch (sortByCategory) {
        case "name":
          return a.name.common.localeCompare(b.name.common);
        case "population":
          return (b.population || 0) - (a.population || 0);
        case "area":
          return (b.area || 0) - (a.area || 0);
        default:
          return 0;
      }
    });
  }, [result, searchElement, sortByCategory, sortByRegion, sortByStatus]);

  useEffect(() => {
    if (filtredResult) setTotalCountries(filtredResult?.length);
  }, [filtredResult, setTotalCountries]);
  return (
    <div className="mt-9">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-left">
            <th className="min-w-22.5 lg:w-24.25 pb-4.5">Flag</th>
            <th className="min-w-37 lg:w-48.75 pb-4.5 ">Name</th>
            <th className="w-34.75 pb-4.5 hidden min-[400px]:table-cell lg:w-49.25">
              Population
            </th>
            <th className="hidden md:table-cell pb-4.5 xl:w-48">Area (km²)</th>
            <th className="hidden xl:table-cell pb-4.5">Region</th>
          </tr>
          <tr className="h-4.25 w-full border-t-2 border-brand-gray-800"></tr>
        </thead>
        <tbody>
          {filtredResult === null ? (
            <TableSkeleton />
          ) : (
            <TableResults result={filtredResult} />
          )}
        </tbody>
      </table>
    </div>
  );
}
