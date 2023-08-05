"use client";

import { Modal } from "@/components/Modal";
import { useState } from "react";
import type {
  SwatchCard,
  Paint,
  ImageKitUpload,
  SwatchCardType,
  Manufacturer,
  Line,
  PaperType,
  User,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "@/lib/date-time";

export type SwatchCardItemProps = Omit<SwatchCard, "imageKitUploadId"> & {
  imageKitUpload: ImageKitUpload;
  paint: Paint;
  swatchCardTypesOnSwatchCard: {
    swatchCardType: SwatchCardType;
  }[];
  paperManufacturer: Manufacturer;
  paperLine: Line;
  paperType: PaperType;
  author: User;
};

function alignmentClasses({
  height,
  width,
}: {
  height: number | null;
  width: number | null;
}): {
  alignment: string;
  swatchCardClasses: string;
  aspectRatioClasses: string;
  modalSwatchCardClasses: string;
  modalSwatchDescriptionClasses: string;
  modalSwatchScaledQuery: string;
} {
  const cardDetails = {
    alignment: "",
    swatchCardClasses: "",
    aspectRatioClasses: "",
    modalSwatchCardClasses: "",
    modalSwatchDescriptionClasses: "",
    modalSwatchScaledQuery: "",
  };

  if (height === width || !height || !width) {
    cardDetails.alignment = "square";
    cardDetails.swatchCardClasses = "col-span-1 row-span-1";
    cardDetails.aspectRatioClasses = "aspect-square";
    cardDetails.modalSwatchCardClasses = "col-span-12 md:col-span-6 ";
    cardDetails.modalSwatchDescriptionClasses = "col-span-12 md:col-span-6";
    cardDetails.modalSwatchScaledQuery = "?tr=w-386,h-386";
    // Vertical
  } else if (height > width) {
    cardDetails.alignment = "vertical";
    cardDetails.swatchCardClasses = "col-span-1 row-span-1 md:row-span-2";
    cardDetails.aspectRatioClasses = "aspect-square md:aspect-[1/2]";
    cardDetails.modalSwatchCardClasses = "col-span-12 sm:col-span-4";
    cardDetails.modalSwatchDescriptionClasses = "col-span-12 sm:col-span-8";
    cardDetails.modalSwatchScaledQuery = width > 250 ? "?tr=w-250" : "";
    // Horizontal
  } else if (height < width) {
    cardDetails.alignment = "horizontal";
    cardDetails.swatchCardClasses = "col-span-1 md:col-span-2 row-span-1";
    cardDetails.aspectRatioClasses = "aspect-square md:aspect-[2/1]";
    cardDetails.modalSwatchCardClasses = "col-span-12";
    cardDetails.modalSwatchDescriptionClasses = "col-span-12";
    cardDetails.modalSwatchScaledQuery = width > 800 ? "?tr=w-800" : "";
  }

  return cardDetails;
}

export function SwatchCardItem({
  swatchCard,
}: {
  swatchCard: SwatchCardItemProps;
}) {
  const {
    swatchCardClasses,
    aspectRatioClasses,
    modalSwatchCardClasses,
    modalSwatchDescriptionClasses,
    modalSwatchScaledQuery,
    alignment,
  } = alignmentClasses({
    height: swatchCard.imageKitUpload.height,
    width: swatchCard.imageKitUpload.width,
  });

  const [isOpen, setIsOpen] = useState(false);

  const {
    updatedAt,
    swatchCardTypesOnSwatchCard,
    paperManufacturer,
    paperLine,
    paperType,
    paperWeightInLbs,
    isOriginal,
    author,
    description,
    imageKitUpload,
  } = swatchCard;

  const imageIsScaledDown =
    imageKitUpload.width !== null &&
    (imageKitUpload.width > 800 ||
      (alignment === "vertical" && imageKitUpload.width > 250));

  return (
    <>
      <div
        className={`cursor-pointer border-2 border-black p-1 relative ${swatchCardClasses}`}
        onClick={() => setIsOpen(true)}
      >
        <div className={aspectRatioClasses}>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${swatchCard.imageKitUpload.url})`,
              backgroundColor: swatchCard.paint.hex || "#ffffff",
            }}
          />
        </div>
      </div>
      <Modal
        title={swatchCard.paint.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="col-span-12 grid grid-cols-12 gap-6">
          <div className={modalSwatchCardClasses}>
            <Image
              className="max-w-full"
              src={`https://ik.imagekit.io/paintlibrary${imageKitUpload.filePath}${modalSwatchScaledQuery}`}
              alt="{paintName} Swatch"
              title="{paintName} Swatch"
              width={imageKitUpload.width || 200}
              height={imageKitUpload.height || 200}
            />
            {imageIsScaledDown && (
              <p className="text-xs my-2">
                Swatch is scaled down.&nbsp;
                <Link
                  href={imageKitUpload?.url}
                  target="_blank"
                  rel="noopener"
                  className="decorate-link "
                >
                  See full-size swatch.
                </Link>
              </p>
            )}
          </div>
          <div className={modalSwatchDescriptionClasses}>
            {description && (
              <>
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <div className="text-sm">{description}</div>
                <hr className="my-3" />
              </>
            )}

            {paperManufacturer?.name ||
              (paperType?.name && (
                <>
                  <h3 className="text-lg font-bold mb-2">Paper</h3>
                  <div className="text-sm">
                    {paperLine?.name ? paperLine?.name : ""}
                    {paperType?.name ? paperType?.name : ""}
                    {paperWeightInLbs ? `${paperWeightInLbs} lb.` : ""}

                    {paperManufacturer?.name && (
                      <>
                        by
                        <Link
                          href="/manufacturer/{paperManufacturer.slug}"
                          className="decorate-link"
                        >
                          {paperManufacturer?.name}
                        </Link>
                      </>
                    )}
                  </div>
                  <hr className="my-3" />
                </>
              ))}

            {swatchCardTypesOnSwatchCard.length > 0 && (
              <>
                <h3 className="text-lg font-bold mb-2">Includes Tests</h3>
                <ul className="">
                  {swatchCardTypesOnSwatchCard.map((item, index) => (
                    <li className="mb-1" key={index}>
                      <span className="font-bold text-sm">
                        {item.swatchCardType.label}
                      </span>
                      <p className="text-xs">
                        {item.swatchCardType.description}
                      </p>
                    </li>
                  ))}
                </ul>
                <hr className="my-3" />
              </>
            )}

            {author && isOriginal ? (
              <p className="text-xs mt-2 leading-tight my-2">
                Contributed by @
                <Link
                  href={`/user/${author.username}`}
                  className="decorate-link"
                >
                  {author.username}
                </Link>
                {author.role === "ADMIN" && <>&nbsp;[ADMIN ICON]&nbsp;</>}
                {timeAgo(updatedAt)}.
              </p>
            ) : (
              <p className="text-xs mt-2 leading-tight">
                Uploaded {timeAgo(updatedAt)}.
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
