const url: string = "https://restcountries.com/v3.1/alpha/";
import Image from "next/image";
import Link from "next/link";
import { Country } from "@/types/country";

interface Neighbour {
  name: { common: string };
  flags: { svg: string; alt: string };
  cca3: string;
}
export default async function CountryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const response = await fetch(`${url}${id}`);
  const data = await response.json();
  const country: Country = data[0];

  let neighbourCountries: Neighbour[] = [];
  if (country.borders && country.borders.length > 0) {
    const codes = country.borders.join(",");
    const res = await fetch(`${url}?codes=${codes}&fields=name,flags,cca3`);
    if (res.ok) neighbourCountries = await res.json();
  }

  const details = [
    { label: "Capital", value: country.capital?.[0] || "None" },
    { label: "Subregion", value: country.subregion },
    {
      label: "Language",
      value: country.languages
        ? Object.values(country.languages).join(",")
        : "N/A",
    },
    {
      label: "Currencies",
      value: country.currencies
        ? Object.values(country.currencies)
            .map((c) => c.name)
            .join(",")
        : "N/A",
    },
    { label: "Continents", value: country.continents?.join(",") },
  ];
  return (
    <div
      className="mt-16 lg:mt-4 border border-brand-gray-800 min-[550px]:rounded-xl
            bg-brand-gray-900 py-4.5 h-fit w-full max-w-160 mx-auto
             lg:py-6"
    >
      <figure className="relative w-37.5 h-22.5 left-1/2 -translate-x-1/2 -top-12">
        <Image src={country.flags.svg} alt={country.flags.alt} fill />
      </figure>

      <h1 className="text-[32px] text-center -mt-4 text-brand-gray-200">
        {country.name.common}
      </h1>
      <h2 className="text-brand-gray-200 text-center text-base">
        {country.name.official}
      </h2>
      <div
        className="flex flex-col gap-5 min-[550]:gap-0 min-[550px]:flex-row 
        mx-auto my-10 px-2.5 md:px-5 min-[550px]:gap-10 min-[550px]:justify-center"
      >
        <div
          className="flex bg-brand-gray-800 px-2.5 py-2 rounded-lg h-11 box-border 
                    text-sm items-center justify-between w-60"
        >
          <p>Population</p>
          <span className="inline-block w-px h-full bg-brand-gray-900"></span>
          <p>{country.population.toLocaleString("en-US")}</p>
        </div>
        <div
          className="flex bg-brand-gray-800 p-2.5 rounded-lg h-11 box-border
                        text-sm items-center justify-between w-55"
        >
          <p>Area (km²)</p>
          <span className="inline-block w-px h-full bg-brand-gray-900"></span>
          <p>{country.area.toLocaleString("en-US")}</p>
        </div>
      </div>
      {details.map((detail) => (
        <div
          key={detail.label}
          className="flex justify-between flex-wrap border-t border-t-brand-gray-800 h-20 items-center px-3 md:px-5"
        >
          <span>{detail.label}</span>
          <span className="ms-auto">{detail.value}</span>
        </div>
      ))}
      <div className="border-t border-t-brand-gray-800 p-2.5 md:px-5">
        <p className="my-5">Neighbouring Countries</p>
        <div className="flex gap-5 flex-wrap ">
          {neighbourCountries &&
            neighbourCountries.map((country) => (
              <Link key={country.name.common} href={`/country/${country.cca3}`}>
                <figure className="w-25 h-16 object-contain relative">
                  <Image
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    fill
                    className="object-contain"
                  />
                </figure>

                <p>{country.name.common}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
