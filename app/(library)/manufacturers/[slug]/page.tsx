import prisma from "@/lib/prisma";

import { PageHeader } from "@/components/client";
import { Metadata } from "next";

import type { Manufacturer, Paint, Pigment, Line, Color } from "@prisma/client";
import { ExternalLink, ManufacturerPaintTable } from "@/components/client";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const manufacturer = await prisma.manufacturer
    .findFirst({
      where: {
        slug: decodeURIComponent(slug),
      },
      select: {
        name: true,
      },
    })
    .then((res) => res);

  if (!manufacturer) return {};

  return {
    title: manufacturer.name,
  };
}

async function getManufacturer<T extends { [key: string]: Promise<any> }>({
  slug,
}: {
  slug: string;
}): Promise<UnPromisifiedObject<T>> {
  const manufacturer = await prisma.manufacturer.findFirst({
    where: {
      slug: decodeURIComponent(slug),
    },
    select: {
      name: true,
      _count: true,
      sellPaint: true,
      sellPaper: true,
      paints: {
        select: {
          uuid: true,
          slug: true,
          name: true,
          lightfastRating: true,
          transparencyRating: true,
          stainingRating: true,
          granulationRating: true,
          line: true,
          hex: true,
          _count: true,
          swatchCard: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              imageKitUpload: true,
              primaryOnPaintUuid: true,
            },
          },
          pigmentsOnPaints: {
            select: {
              pigment: {
                select: {
                  name: true,
                  slug: true,
                  type: true,
                  number: true,
                  color: {
                    select: {
                      slug: true,
                      code: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: [
          {
            line: {
              name: "asc",
            },
          },
          {
            name: "asc",
          },
        ],
      },
    },
  });

  return manufacturer as UnPromisifiedObject<T>;
}

type PigmentProps = Pigment & {
  color: Color;
};

type PaintProps = Paint & {
  swatchCard: any;
  lightfastRating: Rating;
  transparencyRating: Rating;
  stainingRating: Rating;
  granulationRating: Rating;
  line: Line;
  _count: {
    pigmentsOnPaints: number;
  };
  pigmentsOnPaints: {
    pigment: PigmentProps;
  }[];
};

export type ManufacturerProps = Manufacturer & {
  paints: PaintProps[];
  _count: {
    lines: number;
    paints: number;
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const manufacturer = (await getManufacturer({
    slug,
  })) as ManufacturerProps;

  const { name, website } = manufacturer;

  return (
    <>
      <PageHeader
        title={name}
        subtitle={
          <ExternalLink url={website}>Visit {name}&apos;s website</ExternalLink>
        }
      />

      {manufacturer.sellPaint && (
        <section className="mb-16">
          <h2 className="font-bold text-3xl mb-6">Paints</h2>

          {manufacturer._count.paints === 0 ? (
            <div className="p-3 grid place-items-center border-2">
              <div className="text-center m-3">
                <p className="font-bold text-2xl">
                  No paints from {manufacturer.name} added to the library yet.
                </p>
              </div>
            </div>
          ) : (
            <ManufacturerPaintTable manufacturer={manufacturer} />
          )}
        </section>
      )}
    </>
  );
}
