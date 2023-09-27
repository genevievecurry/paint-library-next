"use client";

import { PaintCardItem } from "@/components/client";
import type { PaintCardItemProps } from "@/components/client";

async function getPaintCardCollection({
  count,
  set,
  pigmentId,
  orderByKey,
  orderByDirection,
  showOnlySwatched = false,
}: {
  count?: number;
  set?: number;

  pigmentId?: number;
  orderByKey?: string;

  orderByDirection?: "asc" | "desc";
  showOnlySwatched?: boolean;
}) {
  const params = {
    count,
    set,
    showOnlySwatched,
    pigmentId,
    orderByKey,
    orderByDirection,
  };

  function getparams(data: { [key: string]: any }) {
    return Object.keys(data)
      .filter((key) => data[key] !== undefined)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&");
  }

  const url = `${process.env.API_BASE_URL}/paint/collection?${getparams(
    params
  )}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log("OH NO");
      throw new Error("Request failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function ClientPaintCardCollection({
  count,
  pigmentId,
  orderByKey,
  orderByDirection,
  emptyMessage,
  children,
  showOnlySwatched,
  pigmentComposition = "any",
}: {
  count?: number;
  pigmentId?: number;
  orderByKey?: string;
  orderByDirection?: "asc" | "desc";
  emptyMessage?: React.ReactNode;
  children?: React.ReactNode;
  showOnlySwatched?: boolean;
  pigmentComposition?: "any" | "single" | "multi";
}) {
  let paintCardCollectionData = (await getPaintCardCollection({
    count,
    pigmentId,
    orderByKey,
    orderByDirection,
    showOnlySwatched,
  })) as PaintCardItemProps[];

  if (pigmentComposition === "single") {
    paintCardCollectionData = paintCardCollectionData.filter(
      (paint) => paint._count.pigmentsOnPaints === 1
    );
  } else if (pigmentComposition === "multi") {
    paintCardCollectionData = paintCardCollectionData.filter(
      (paint) => paint._count.pigmentsOnPaints > 1
    );
  }

  if (paintCardCollectionData.length === 0 && emptyMessage) {
    return <>{emptyMessage}</>;
  }

  return (
    <>
      {children}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3">
        {paintCardCollectionData.map((paint) => (
          <PaintCardItem key={paint.uuid} paint={paint} />
        ))}
      </div>
    </>
  );
}
