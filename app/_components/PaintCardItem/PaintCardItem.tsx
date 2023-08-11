"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type {
  Color,
  ImageKitUpload,
  Paint,
  Pigment,
  PigmentsOnPaints,
} from "@prisma/client";

import { pigmentCode } from "@/lib/utilities";

type pigmentLinkProps = Pigment & {
  color: Color;
};

export type PaintCardItemProps = Omit<Paint, "swatchCard"> & {
  swatchCard: {
    imageKitUpload: ImageKitUpload;
    primaryOnPaintUuid: string;
  }[];
  manufacturer?: {
    name: string;
  };
  line?: {
    name: string;
  };
  pigmentsOnPaints: PigmentsOnPaints &
    {
      pigment: pigmentLinkProps;
    }[];
  _count: {
    notes: number;
    paintsInPalette: number;
    pigmentsOnPaints: number;
    swatchCard: number;
    tags: number;
  };
};

export function PaintCardItem({ paint }: { paint: PaintCardItemProps }) {
  const router = useRouter();
  const {
    uuid,
    slug,
    hex,
    name,
    swatchCard,
    manufacturer,
    line,
    pigmentsOnPaints,
  } = paint;
  const swatchHeight = 200;
  const swatchWidth = 200;

  const SwatchImage = () => {
    if (swatchCard.length > 0) {
      const filePath = swatchCard[0].imageKitUpload.filePath;
      const src = `https://ik.imagekit.io/paintlibrary/tr:w-${swatchWidth},h-${swatchHeight}${filePath}`;
      return (
        <Image
          src={src}
          width={swatchWidth}
          height={swatchHeight}
          alt={name}
          loading="lazy"
          className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-all"
        />
      );
    }
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

  return (
    <div className="table border-2 border-black p-1 break-inside mb-3 w-full relative">
      <Link href={`/paint/${uuid}/${slug}`}>
        <div className="flex-1">
          <div
            className="aspect-square"
            style={{ backgroundColor: hex || "#FFF" }}
          >
            <SwatchImage />
          </div>
        </div>
      </Link>
      <div className="p-1 leading-4 flex flex-col">
        <div className="flex-1">
          <Link href={`/paint/${uuid}/${slug}`} className="decorate-link">
            {name}
          </Link>
          {manufacturer && (
            <span className="block text-xs mt-1">{manufacturer.name}</span>
          )}
          {line && (
            <span className="block text-xs font-light">{line.name}</span>
          )}
        </div>
        <div className="flex-1">
          {pigmentsOnPaints.length > 0 &&
            pigmentsOnPaints.map((pigmentsOnPaint, index) => (
              <div key={pigmentsOnPaint.pigment.slug} className="inline">
                <div
                  onClick={() =>
                    router.push(
                      `/pigments/${pigmentsOnPaint.pigment.color.slug}/${pigmentsOnPaint.pigment.slug}`
                    )
                  }
                  className="decorate-link text-xs z-10 inline-block cursor-pointer"
                >
                  {pigmentLinkLabel(pigmentsOnPaint.pigment)}
                </div>
                {/* Adds a comma after entries if there are more than one */}
                {index + 1 < paint._count.pigmentsOnPaints && <>, </>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
