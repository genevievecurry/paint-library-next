import prisma from "@/lib/prisma";
import { PaintCardItem } from "@/components/client";
import type { PaintCardItemProps } from "@/components/client";
import type { Prisma } from "@prisma/client";

const paintCardCollectionSelect: Prisma.PaintSelect = {
  published: true,
  uuid: true,
  slug: true,
  hex: true,
  name: true,
  pigmentsOnPaints: {
    select: {
      pigment: {
        select: {
          slug: true,
          type: true,
          number: true,
          name: true,
          color: {
            select: {
              code: true,
              slug: true,
            },
          },
        },
      },
    },
  },
  _count: true,
  line: {
    select: {
      name: true,
    },
  },
  manufacturer: {
    select: {
      name: true,
    },
  },
  swatchCard: {
    orderBy: {
      createdAt: "desc",
    },
    select: {
      imageKitUpload: true,
      primaryOnPaintUuid: true,
    },
  },
};

async function getPaintCardCollection<
  T extends { [key: string]: Promise<any> }
>({
  count = undefined,
  set = 0,
  showAll = true,
  showOnlySwatched = false,
  pigmentId = undefined,
  orderBy = undefined,
}: {
  count?: number | undefined;
  set?: number;
  showAll?: boolean;
  showOnlySwatched?: boolean;
  pigmentId?: number;
  orderBy?: { [key: string]: "asc" | "desc" };
}): Promise<UnPromisifiedObject<T>> {
  const take = count ? count + set : undefined;

  const paintCardCollection = await prisma.paint.findMany({
    skip: set,
    take: take,
    where: {
      pigmentsOnPaints: {
        some: {
          pigment: {
            is: {
              id: pigmentId,
            },
          },
        },
      },
      published: showAll,
      swatchCard: showOnlySwatched
        ? {
            some: {
              primaryOnPaintUuid: {
                not: null,
              },
            },
          }
        : undefined,
    },
    orderBy: orderBy,
    select: paintCardCollectionSelect,
  });

  return paintCardCollection as UnPromisifiedObject<T>;
}

export async function PaintCardCollection({
  count,
  showOnlySwatched = false,
  pigmentId,
  pigmentComposition = "any",
  orderBy,
  emptyMessage,
  children,
}: {
  count?: number;
  showOnlySwatched?: boolean;
  pigmentId?: number;
  pigmentComposition?: "any" | "single" | "multi";
  orderBy?: { [key: string]: "asc" | "desc" };
  emptyMessage?: React.ReactNode;
  children?: React.ReactNode;
}) {
  let paintCardCollectionData = (await getPaintCardCollection({
    count,
    showOnlySwatched,
    pigmentId,
    orderBy,
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

  if (paintCardCollectionData.length === 0) {
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
