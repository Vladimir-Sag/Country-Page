"use client";

const selectMenu = ["Population", "Name", "Area"];
interface CountryCategory {
  setSortByCategory: (category: "name" | "population" | "area") => void;
}
export default function SelectMenuElement({
  setSortByCategory,
}: CountryCategory) {
  return (
    <div className="mt-7.5">
      <label htmlFor="sort-select" className="text-xs -tracking-[0.035em]">
        Sort by
      </label>
      <select
        name="sort"
        id="sort-select"
        className="appearance-none mt-1.5 border-2 border-brand-gray-800 
                        bg-brand-gray-900 box-border w-full rounded-xl
                        px-3.5 text-sm -tracking-[0.025em] h-10.5
                        bg-[url('../public/Expand_down.svg')] bg-no-repeat bg-position-[right_14px_center]"
        onChange={(e) => {
          const value = e.target.value as "name" | "population" | "area";
          setSortByCategory(value);
        }}
      >
        {selectMenu.map((elem) => (
          <option key={elem} value={elem.toLowerCase()}>
            {elem}
          </option>
        ))}
      </select>
    </div>
  );
}
