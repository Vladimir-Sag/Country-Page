"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Country } from "@/types/country";

interface TableResultsProps {
  result: Country[];
}
export default function TableResults({ result }: TableResultsProps) {
  const router = useRouter();
  return (
    <>
      {result.slice(0, 25).map((country) => (
        <tr
          key={country.cca3}
          className="text-left border-b-24 border-transparent hover:bg-brand-gray-800/30 cursor-pointer "
          onClick={() => router.push(`country/${country.cca3}`)}
        >
          <td className="w-12.5 min-w-12.5 ">
            <div className="relative w-12.5 h-9.5 overflow-hidden rounded-sm">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt}
                fill
                className="w-full h-full"
              />
            </div>
          </td>
          <td className="w-37 min-w-37 pb-1.5">
            <Link
              href={`country/${country.cca3}`}
              onClick={(e) => e.stopPropagation()}
            >
              {country.name.common}
            </Link>
          </td>
          <td className="pb-1.5 hidden min-[400px]:table-cell tracking-tight">
            {country.population?.toLocaleString("en-US")}
          </td>
          <td className="pb-1.5 hidden md:table-cell ">
            {country.area?.toLocaleString("en-US")}
          </td>
          <td className="pb-1.5 hidden xl:table-cell ">{country.region}</td>
        </tr>
      ))}
    </>
  );
}
