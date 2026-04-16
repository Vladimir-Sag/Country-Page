"use client";
export default function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <tr key={i} className=" border-b-6 border-transparent">
          <td className="w-22.5  pb-4.5">
            <div className="w-12.5 h-9.5 bg-brand-gray-800 rounded-sm"></div>
          </td>
          <td className="w-37 min-w-37 pb-4.5">
            <div className="my-auto bg-brand-gray-800 rounded-full w-26.5 h-2.5"></div>
          </td>
          <td className="w-34.75 pb-4.5 hidden min-[400px]:table-cell">
            <div className="my-auto bg-brand-gray-800 rounded-full w-26.5 h-2.5"></div>
          </td>
          <td className="hidden md:table-cell pb-4.5">
            <div className="my-auto bg-brand-gray-800 rounded-full w-26.5 h-2.5"></div>
          </td>
          <td className="hidden xl:table-cell pb-4.5">
            <div className="my-auto bg-brand-gray-800 rounded-full w-26.5 h-2.5"></div>
          </td>
        </tr>
      ))}
    </>
  );
}
