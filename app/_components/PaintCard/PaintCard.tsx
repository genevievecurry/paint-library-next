import Link from "next/link";
import Image from "next/image";
import type { ImageKitUpload } from "@prisma/client";

export type PaintCardProps = {
  published: boolean;
  uuid: string;
  slug: string;
  hex: string;
  name: string;
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
};

export function PaintCard({ paint }: { paint: PaintCardProps }) {
  const { uuid, slug, hex, name, swatchCard, manufacturer, line } = paint;
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
    } else {
      return <></>;
    }
  };

  return (
    <div className="table border-2 border-black p-1 break-inside mb-3 w-full">
      <Link href={`/paint/${uuid}/${slug}`} className="h-full flex flex-col">
        <div className="flex-1">
          <div
            className="aspect-w-16 aspect-h-16"
            style={{ backgroundColor: hex || "#FFF" }}
          >
            <SwatchImage />
          </div>
        </div>
        <div className="p-1 leading-4 flex flex-col">
          <div className="flex-1">
            <span className="decorate-link">{name}</span>
            <span className="block text-xs mt-1">{manufacturer?.name}</span>
            {line && (
              <span className="block text-xs font-light">{line?.name}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
