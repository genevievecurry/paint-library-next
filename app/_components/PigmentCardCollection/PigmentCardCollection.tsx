import prisma from "@/lib/prisma";
import { PigmentCardItem } from "../PigmentCardItem";
import type { PigmentCardItemProps } from "../PigmentCardItem";

async function getPigmentCardCollection<
  T extends { [key: string]: Promise<any> }
>({
  paintId,
}: {
  paintId?: number;
  colorCode?: string;
}): Promise<UnPromisifiedObject<T>> {
  const pigmentCardCollection = await prisma.pigmentsOnPaints.findMany({
    where: {
      paintId: paintId,
    },
    select: {
      pigment: {
        select: {
          color: {
            select: {
              code: true,
              label: true,
              slug: true,
              hex: true,
            },
          },
          lightfastRatingCode: true,
          lightfastRating: true,
          transparencyRatingCode: true,
          transparencyRating: true,
          id: true,
          hex: true,
          slug: true,
          name: true,
          number: true,
          type: true,
          imageKitUpload: true,
          _count: true,
        },
      },
    },
    orderBy: {
      pigment: {
        name: "asc",
      },
    },
  });
  return pigmentCardCollection as UnPromisifiedObject<T>;
}

export async function PigmentCardCollection({ paintId }: { paintId: number }) {
  const pigmentCardCollection = (await getPigmentCardCollection({
    paintId: paintId,
  })) as { pigment: PigmentCardItemProps }[];

  if (pigmentCardCollection.length === 0)
    return (
      <span className="block my-4 text-gray-400 font-light">
        No pigments added yet.
      </span>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
      {pigmentCardCollection.map((pigmentOnPaint) => (
        <PigmentCardItem
          key={pigmentOnPaint.pigment.id}
          pigment={pigmentOnPaint.pigment}
        />
      ))}
    </div>
  );
}
