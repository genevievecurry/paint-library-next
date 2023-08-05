import prisma from "@/lib/prisma";
import { SwatchCardItem } from "@/components/client";
import type { SwatchCardItemProps } from "@/components/client";
import type { Prisma } from "@prisma/client";
import { limitedUserSelect } from "@/lib/user";

const swatchCardSelect: Prisma.SwatchCardSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  author: {
    select: limitedUserSelect,
  },
  swatchCardTypesOnSwatchCard: {
    select: {
      swatchCardType: {
        select: {
          description: true,
          label: true,
          name: true,
        },
      },
    },
  },
  isOriginal: true,
  primaryOnPaintUuid: true,
  paperManufacturer: true,
  paperLine: true,
  paperType: true,
  paperWeightInLbs: true,
  description: true,
  imageKitUpload: true,
  paint: {
    select: {
      slug: true,
      uuid: true,
      name: true,
      hex: true,
      manufacturer: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
};

async function getSwatchCardCollection<
  T extends { [key: string]: Promise<any> }
>({
  paintId,
  authorUuid,
}: {
  paintId?: number;
  authorUuid?: string;
}): Promise<UnPromisifiedObject<T>> {
  const swatchCardCollection = await prisma.swatchCard.findMany({
    where: {
      paintId: paintId,
      authorUuid: authorUuid,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: swatchCardSelect,
  });

  return swatchCardCollection as UnPromisifiedObject<T>;
}

export async function SwatchCardCollection({
  paintId,
  authorUuid,
}: {
  paintId?: number;
  authorUuid?: string;
}) {
  const swatchCardCollection = (await getSwatchCardCollection({
    paintId,
    authorUuid,
  })) as SwatchCardItemProps[];

  return (
    <>
      <section className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
        {swatchCardCollection.map((swatchCard) => (
          <SwatchCardItem key={swatchCard.id} swatchCard={swatchCard} />
        ))}
      </section>
    </>
  );
}
