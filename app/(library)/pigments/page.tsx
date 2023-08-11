import prisma from "@/lib/prisma";

import { ColorNavigation } from "@/components/ColorNavigation";
import { PageHeader, PigmentsTable } from "@/components/client";
import type { PigmentsTablePigmentProps } from "@/components/client";

import type { Color } from "@prisma/client";

async function getPigmentsByColor<T extends { [key: string]: Promise<any> }>() {
  const colors = await prisma.color.findMany({
    select: {
      id: true,
      label: true,
      slug: true,
      hex: true,
      _count: true,
      pigments: {
        orderBy: [{ type: "desc" }, { number: "asc" }],
        select: {
          slug: true,
          hex: true,
          name: true,
          number: true,
          type: true,
          colorCode: true,
          lightfastRating: true,
          transparencyRating: true,
          toxicity: true,
          _count: true,
        },
      },
    },
    orderBy: {
      label: "asc",
    },
  });

  return colors as UnPromisifiedObject<T>[];
}

type AllColorsAndPigmentsPageProps = Color & {
  _count: {
    pigments: number;
  };
  pigments: PigmentsTablePigmentProps[];
};

export default async function Page() {
  const colors =
    (await getPigmentsByColor()) as AllColorsAndPigmentsPageProps[];

  const justColors = colors.map((color) => {
    return {
      label: color.label,
      slug: color.slug,
      hex: color.hex,
      _count: color._count,
    };
  }) as ColorNavigation[];

  return (
    <>
      <PageHeader title="Pigments" />

      <div className="grid grid-cols-6">
        <ColorNavigation colors={justColors} />
        <div className="col-span-6 md:col-span-5">
          {colors.map((color) => (
            <section id={color.slug} key={color.slug}>
              <div className="sticky top-0 bg-white py-2">
                <h2 className="font-bold text-3xl">{color.label}</h2>
              </div>
              <PigmentsTable pigments={color.pigments} color={color} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
