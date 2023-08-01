import prisma from "@/lib/prisma";
import { PaintCard, PaintCardProps } from "@/components/PaintCard";
import type { Prisma } from "@prisma/client";

const paintCollectionSelect: Prisma.PaintSelect = {
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

async function getPaintCollection({
  count = 50,
}: {
  count: number;
}): Promise<{}[]> {
  const set = 0;
  const take = count + set;
  const showAll = true;
  const showOnlySwatched = true;

  const results = await prisma.paint.findMany({
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
    select: paintCollectionSelect,
  });

  return results;
}

export async function PaintCollection({ count }: { count: number }) {
  const paintCollectionData = (await getPaintCollection({
    count,
  })) as PaintCardProps[];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3">
      {paintCollectionData.map((paint) => (
        <PaintCard key={paint.uuid} paint={paint} />
      ))}
    </div>
  );
}
