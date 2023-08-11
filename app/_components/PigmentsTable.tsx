"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PigmentCodeComponent } from "@/components/PigmentCodeComponent";
import type { Color, Pigment } from "@prisma/client";
import type { Rating } from "@/components/PaintRatings";

export type PigmentsTablePigmentProps = Pigment & {
  lightfastRating: Rating;
  transparencyRating: Rating;
  _count: {
    paints: number;
  };
};

export type PigmentsTable = {
  pigments: PigmentsTablePigmentProps[];
  color: Color;
};

export function PigmentsTable(props: PigmentsTable) {
  const { pigments, color } = props;

  const router = useRouter();

  return (
    <table className="border-separate my-4 w-full pigment-table">
      <thead className="text-left border-b relative">
        <tr>
          <th className="sticky top-12 pl-1 pr-3 py-3 bg-white border-y border-l" />
          <th className="sticky top-12 px-3 py-3 whitespace-nowrap bg-white border-y">
            CI Code
          </th>
          <th className="sticky top-12 px-3 w-full whitespace-nowrap bg-white border-y">
            Common Name
          </th>
          <th className="sticky top-12 px-3 text-xs text-center hidden sm:table-cell whitespace-nowrap bg-white border-y">
            In Paints
          </th>
          <th className="sticky top-12 px-3 text-xs text-center hidden sm:table-cell whitespace-nowrap bg-white border-y">
            Lightfast
          </th>
          <th className="sticky top-12 px-3 text-xs text-center hidden sm:table-cell whitespace-nowrap bg-white border-y">
            Transparency
          </th>
          <th className="sticky top-12 px-3 text-xs text-center hidden sm:table-cell whitespace-nowrap bg-white border-y border-r">
            Toxicity
          </th>
        </tr>
      </thead>
      <tbody>
        {pigments.map((pigment) => (
          <tr
            className="transition-all border-b cursor-pointer"
            key={pigment.slug}
            onClick={() =>
              router.push(`/pigments/${color.slug}/${pigment.slug}`)
            }
          >
            {/* Hex/Color Thumbnail */}
            <td className="pl-1 pr-3 py-1 border-l border-b">
              <Link href={`/pigments/${color.slug}/${pigment.slug}`}>
                <div
                  className="w-8 h-8 border border-black"
                  style={{
                    backgroundColor: pigment.hex ? pigment.hex : color.hex,
                  }}
                />
              </Link>
            </td>
            {/* CI CODE */}
            <td className="px-3 border-b">
              <span>
                <PigmentCodeComponent
                  type={pigment.type}
                  colorCode={pigment.colorCode}
                  number={pigment.number}
                  slug={pigment.slug}
                />
              </span>
            </td>
            {/* Common Name */}
            <td className="px-3 w-full border-b">
              <span className="decorate-link">{pigment.name}</span>
            </td>

            {/* In Paints */}
            <td
              className="px-3 text-center hidden sm:table-cell border-b"
              title={`Found in ${pigment._count.paints} paints in Paint Library`}
            >
              {pigment._count.paints}
            </td>

            {/* Lightfast Rating */}
            <td
              className="px-3 text-center hidden sm:table-cell border-b"
              title={pigment.lightfastRating.label}
            >
              {pigment.lightfastRating.code !== "X" &&
              pigment.lightfastRating.code !== "NR" ? (
                pigment.lightfastRating.code
              ) : (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>

            {/* Transparency Rating */}
            <td
              className="px-3 text-center hidden sm:table-cell border-b"
              title={pigment.transparencyRating.label}
            >
              {pigment.transparencyRating.code !== "X" ? (
                pigment.transparencyRating.code
              ) : (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>
            {/* Toxicity */}
            <td className="px-3 text-center text-sm hidden sm:table-cell border-r border-b">
              {pigment.toxicity === "A" && <>Low</>}
              {pigment.toxicity === "B" && <>Possible</>}
              {pigment.toxicity === "C" && <>High</>}
              {pigment.toxicity === "D" && <>Extreme</>}
              {pigment.toxicity === "X" && (
                <span className="text-gray-400">&bull;</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
