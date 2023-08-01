import prisma from "@/lib/prisma";
import type {
  GranulationRating,
  LightfastRating,
  Prisma,
  StainingRating,
  TransparencyRating,
} from "@prisma/client";
import { Metadata } from "next";
import PaintRatings from "@/components/PaintRatings";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  const uuid = params.uuid;

  const paint = await prisma.paint
    .findUnique({
      where: {
        uuid,
      },
      select: {
        name: true,
        manufacturer: {
          select: { name: true },
        },
      },
    })
    .then((res) => res);

  if (!paint) return {};

  const title = (): string => {
    if (paint.name && paint.manufacturer?.name) {
      return `${paint.name} by ${paint.manufacturer.name}`;
    } else {
      return paint.name;
    }
  };

  return {
    title: title(),
  };
}

const paintPageSelect: Prisma.PaintSelect = {
  uuid: true,
  slug: true,
  name: true,
  manufacturer: {
    select: {
      slug: true,
      name: true,
      website: true,
    },
  },
  communityDescription: true,
  manufacturerDescription: true,
  lightfastRating: true,
  transparencyRating: true,
  stainingRating: true,
  granulationRating: true,
};

async function getPaint({ uuid }: { uuid: string }) {
  const results = await prisma.paint.findUnique({
    where: {
      uuid,
    },
    select: paintPageSelect,
  });

  return results;
}

type PaintPageProps = {
  uuid: string;
  name: string;
  manufacturer: {
    name: string;
  };
  manufacturerDescription: string;
  communityDescription: string;
  lightfastRating: LightfastRating;
  transparencyRating: TransparencyRating;
  granulationRating: GranulationRating;
  stainingRating: StainingRating;
};

export default async function Page({ params }: { params: { uuid: string } }) {
  const uuid = params.uuid;
  const paintData = await getPaint({ uuid });

  const {
    name,
    manufacturer,
    manufacturerDescription,
    communityDescription,
    lightfastRating,
    transparencyRating,
    granulationRating,
    stainingRating,
  } = paintData as PaintPageProps;

  return (
    <>
      <div className="lg:container mx-auto px-4 sm:px-6">
        <div>[HEADER]</div>
        <div>[SWATCH CARD COLLECTION COMPONENT]</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
          <div className="col-span-2">
            <section className="mt-8">
              <div className="flex justify-start items-center">
                <h2 className="font-bold text-2xl">Ratings</h2>
              </div>
              <PaintRatings
                lightfastRating={lightfastRating}
                transparencyRating={transparencyRating}
                granulationRating={granulationRating}
                stainingRating={stainingRating}
              />
            </section>
          </div>
          <div className="col-span-1">
            <section className="mt-8">
              <div className="flex justify-start items-center">
                <h2 className="font-bold text-2xl">Pigments</h2>
              </div>
              [PIGMENTS COLLECTION COMPONENT]
            </section>
          </div>
          {manufacturerDescription && manufacturer && (
            <div className="col-span-2">
              <section className="mt-8">
                <div className="flex justify-start items-center">
                  <h2 className="font-bold text-2xl">
                    Manufacturer Description
                  </h2>
                </div>
                <span className="text-xs text-gray-500 mt-4 block">
                  From {manufacturer.name}:
                </span>
                <div className="mt-2">{manufacturerDescription}</div>
              </section>
            </div>
          )}
          {communityDescription && (
            <div className="col-span-2">
              <section className="mt-8">
                <div className="flex justify-start items-center">
                  <h2 className="font-bold text-2xl">Community Description</h2>
                </div>
                <div className="mt-2">{communityDescription}</div>
              </section>
            </div>
          )}
        </div>
        <div>[NOTES]</div>
      </div>
    </>
  );
}
