"use client";

import type { Pigment, Color } from "@prisma/client";
import { SwatchImage } from "@/components/client";

import { pigmentCode } from "@/lib/utilities";
import { ManufacturerProps } from "(library)/manufacturers/[slug]/page";
import Link from "next/link";

type pigmentLinkProps = Pigment & {
  color: Color;
};

const pigmentLinkLabel = (pigment: pigmentLinkProps) => {
  if (pigment.type === "ETC") {
    return pigment.name;
  }

  return pigmentCode(
    pigment.type,
    pigment.color.code,
    pigment.number,
    pigment.slug
  );
};

export type ManufacturerPaintTable = {
  manufacturer: ManufacturerProps;
};

export function ManufacturerPaintTable(props: ManufacturerPaintTable) {
  const { manufacturer } = props;

  return (
    <table
      className="border-separate my-4 w-full table-auto"
      style={{ borderSpacing: 0 }}
    >
      <thead className="text-left border-b relative">
        <tr>
          <th className="sticky top-0 p-1 whitespace-nowrap bg-white border-y border-l border-r sm:border-r-0 z-10">
            &nbsp;
          </th>
          <th className="sticky top-0 px-3 py-3 whitespace-nowrap bg-white border-y text-left border-r sm:border-r-0 w-full z-10">
            Name
          </th>
          {manufacturer._count.lines > 0 && (
            <th className="sticky top-0 px-3 text-left whitespace-nowrap bg-white border-y border-r sm:border-r-0">
              Line
            </th>
          )}
          <th className="sticky top-0 px-3 text-xs text-center hidden md:table-cell whitespace-nowrap bg-white border-y">
            Lightfastness
          </th>
          <th className="sticky top-0 px-3 text-xs text-center hidden md:table-cell whitespace-nowrap bg-white border-y">
            Transparency
          </th>
          <th className="sticky top-0 px-3 text-xs text-center hidden md:table-cell whitespace-nowrap bg-white border-y">
            Staining
          </th>
          <th className="sticky top-0 px-3 text-xs text-center hidden md:table-cell whitespace-nowrap bg-white border-y">
            Granulating
          </th>
          <th className="sticky top-0 px-3 text-xs hidden sm:table-cell whitespace-nowrap bg-white border-y text-left border-r">
            Pigments
          </th>
        </tr>
      </thead>
      <tbody>
        {manufacturer.paints.map((paint) => (
          <tr
            className="transition-all border-b cursor-pointer"
            key={paint.uuid}
          >
            <td className="pl-1 pr-3 py-1 border-l border-b border-r sm:border-r-0">
              <Link
                className="w-12 border-2 border-black p-px block"
                href={`/paint/${paint.uuid}/${paint.slug}`}
              >
                <SwatchImage
                  swatchCard={paint.swatchCard}
                  height={50}
                  width={50}
                  name={paint.name}
                  backgroundColor={paint.hex}
                />
              </Link>
            </td>
            <td className="px-3 sm:table-cell border-b border-r sm:border-r-0">
              <Link
                href={`/paint/${paint.uuid}/${paint.slug}`}
                className="decorate-link"
              >
                {paint.name}
              </Link>
            </td>
            {manufacturer._count.lines > 0 && (
              <td className="px-3 border-b border-r sm:border-r-0 whitespace-nowrap">
                {paint.line ? (
                  paint.line.name
                ) : (
                  <div className="text-center">
                    <span className="text-gray-400">&bull;</span>
                  </div>
                )}
              </td>
            )}
            <td
              className="px-3 hidden md:table-cell border-b text-center"
              title={paint.lightfastRating.label}
            >
              {paint.lightfastRating.code !== "X" &&
              paint.lightfastRating.code !== "NR" ? (
                paint.lightfastRating.code
              ) : (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>
            <td
              className="px-3 hidden md:table-cell border-b text-center"
              title={paint.transparencyRating.label}
            >
              {paint.transparencyRating.code !== "X" ? (
                paint.transparencyRating.code
              ) : (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>
            <td
              className="px-3 hidden md:table-cell border-b text-center"
              title={paint.stainingRating.label}
            >
              {paint.stainingRating.code !== "X" ? (
                paint.stainingRating.code
              ) : (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>
            <td
              className="px-3 hidden md:table-cell border-b text-center"
              title={paint.granulationRating.label}
            >
              {paint.granulationRating.code !== "X" ? (
                paint.granulationRating.code
              ) : (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>
            <td className="px-3 hidden sm:table-cell border-b border-r ">
              <div style={{ minWidth: 130 }}>
                {paint.pigmentsOnPaints.length > 0 &&
                  paint.pigmentsOnPaints.map((pigmentsOnPaint, index) => (
                    <div key={pigmentsOnPaint.pigment.slug} className="inline ">
                      <a
                        href={`/pigments/${pigmentsOnPaint.pigment.color.slug}/${pigmentsOnPaint.pigment.slug}`}
                        className="decorate-link text-xs whitespace-nowrap"
                      >
                        {pigmentLinkLabel(pigmentsOnPaint.pigment)}
                      </a>
                      {/* Adds a comma after entries if there are more than one */}
                      {index + 1 < paint._count.pigmentsOnPaints && <>, </>}
                    </div>
                  ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
