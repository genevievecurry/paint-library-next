"use client";

import type { Pigment } from "@prisma/client";
import { pigmentCode, pluralizeWord } from "@/lib/utilities";
import Link from "next/link";

export type PigmentCardItemProps = Omit<Pigment, "colorCode"> & {
  color: {
    label: string;
    hex: string;
    code: string;
    slug: string;
  };
  _count: {
    paints: number;
  };
};

export function PigmentCardItem({
  pigment,
}: {
  pigment: PigmentCardItemProps;
}) {
  const { name, type, number, color, hex, slug, _count } = pigment;

  return (
    <Link className="flex mt-4" href={`/pigments/${color.slug}/${slug}`}>
      <div className="mr-4">
        <div className="border-2 border-black p-0.5 relative">
          <div
            className="w-12 h-12"
            style={{
              background: hex ? hex : color.hex,
            }}
          />
        </div>
      </div>
      <div>
        <div className="transition text-teal-600 font-semibold hover:text-black block leading-tight">
          {name}
        </div>
        <div className="text-gray-500 text-xs">
          {pigmentCode(type, color.code, number, slug)}
        </div>
        {_count.paints > 0 && (
          <div className="text-gray-500 text-xs">
            Also found in <strong>{_count.paints}</strong>{" "}
            {pluralizeWord(_count.paints, " other paint")}.
          </div>
        )}
      </div>
    </Link>
  );
}
