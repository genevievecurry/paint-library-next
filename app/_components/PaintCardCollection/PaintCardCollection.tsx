import prisma from "@/lib/prisma";
import { PaintCardItem } from "@/components/server";
import type { PaintCardItemProps } from "@/components/server";
import type { Prisma } from "@prisma/client";

const paintCardCollectionSelect: Prisma.PaintSelect = {
  published: true,
  uuid: true,
  slug: true,
  hex: true,
  name: true,
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
  count = 50,
  set = 0,
  showAll = true,
  showOnlySwatched = true,
}: {
  count?: number;
  set?: number;
  showAll?: boolean;
  showOnlySwatched?: boolean;
}): Promise<UnPromisifiedObject<T>> {
  const take = count + set;

  const paintCardCollection = await prisma.paint.findMany({
    skip: set,
    take: take + set,
    where: {
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
    orderBy: {
      updatedAt: "desc",
    },
    select: paintCardCollectionSelect,
  });

  return paintCardCollection as UnPromisifiedObject<T>;
}

export async function PaintCardCollection({ count }: { count: number }) {
  const paintCardCollectionData = (await getPaintCardCollection({
    count,
  })) as PaintCardItemProps[];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3">
      {paintCardCollectionData.map((paint) => (
        <PaintCardItem key={paint.uuid} paint={paint} />
      ))}
    </div>
  );
}
