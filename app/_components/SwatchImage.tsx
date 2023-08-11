import Image from "next/image";

export function SwatchImage({
  swatchCard,
  width,
  height,
  name,
  backgroundColor,
}: {
  swatchCard: any;
  width: number;
  height: number;
  name: string;
  backgroundColor?: string | null | undefined;
}) {
  let filePath = "",
    src = "";

  if (swatchCard.length > 0) {
    filePath = swatchCard[0].imageKitUpload.filePath;
    src = `https://ik.imagekit.io/paintlibrary/tr:w-${width},h-${height}${filePath}`;
  }

  return (
    <div
      className="aspect-square"
      style={{ backgroundColor: backgroundColor || "#FFF" }}
    >
      {swatchCard.length > 0 && (
        <Image
          src={src}
          width={width}
          height={height}
          alt={name}
          loading="lazy"
          className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-all"
        />
      )}
    </div>
  );
}
