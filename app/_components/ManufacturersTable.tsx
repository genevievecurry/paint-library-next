"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Manufacturer } from "@prisma/client";
import { useRouter } from "next/navigation";

export type ManufacturerTableManufacturerProps = Manufacturer & {
  _count: {
    paints: number;
    swatchCard: number;
  };
};

export type ManufacturersTableProps = {
  manufacturers: ManufacturerTableManufacturerProps[];
};

export function ManufacturersTable(props: ManufacturersTableProps) {
  const { manufacturers } = props;
  const router = useRouter();

  return (
    <table
      className="border-separate my-4 w-full table-fixed"
      style={{ borderSpacing: 0 }}
    >
      <thead className="text-left border-b relative">
        <tr>
          <th className="sticky top-0 px-3 py-3 whitespace-nowrap bg-white border-y border-l">
            Name
          </th>

          <th className="sticky top-0 px-3 text-xs text-center hidden sm:table-cell whitespace-nowrap bg-white border-y">
            Make Paint?
          </th>
          <th className="sticky top-0 px-3 text-xs text-center whitespace-nowrap bg-white border-y">
            Paints
          </th>

          <th className="sticky top-0 px-3 text-xs text-center hidden sm:table-cell whitespace-nowrap bg-white border-y">
            Make Paper?
          </th>

          <th className="sticky top-0 px-3 text-xs text-center sm:whitespace-nowrap bg-white border-y border-r">
            Paper Swatch Cards
          </th>
        </tr>
      </thead>
      <tbody>
        {manufacturers.map((manufacturer) => (
          <tr
            className="transition-all border-b cursor-pointer"
            onClick={() => router.push(`/manufacturers/${manufacturer.slug}`)}
            key={manufacturer.id}
          >
            <td className="pl-1 pr-3 py-1 border-l border-b">
              <span className="decorate-link whitespace-nowrap">
                {manufacturer.name}
              </span>
            </td>
            <td className="px-3 text-center hidden sm:table-cell border-b">
              {manufacturer.sellPaint === true ? (
                <CheckIcon className="h-6 w-6 inline-block text-green-500" />
              ) : (
                <XMarkIcon className="h-4 w-4 inline-block text-gray-300" />
              )}
            </td>
            <td className="px-3 text-center border-b">
              {manufacturer.sellPaint === true && manufacturer._count.paints > 0
                ? manufacturer._count.paints
                : ""}
            </td>
            <td className="px-3 text-center hidden sm:table-cell border-b">
              {manufacturer.sellPaper === true ? (
                <CheckIcon className="h-6 w-6 inline-block text-green-500" />
              ) : (
                <XMarkIcon className="h-4 w-4 inline-block text-gray-300" />
              )}
            </td>
            <td className="px-3 text-center border-b border-r">
              {manufacturer._count.swatchCard > 0
                ? manufacturer._count.swatchCard
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
