import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import {
  PaintRatings,
  SwatchCardCollection,
  NoteCollection,
  PigmentCardCollection,
} from "@/components/server";

import { PageHeader } from "@/components/client";

import type { Rating } from "@/components/PaintRatings";

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
  id: true,
  uuid: true,
  slug: true,
  name: true,
  line: true,
  hex: true,
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
  _count: true,
};

type PaintPageProps = {
  id: number;
  uuid: string;
  name: string;
  hex: string;
  line: { name: string };
  manufacturer: {
    name: string;
    slug: string;
    website: string;
  };
  manufacturerDescription: string;
  communityDescription: string;
  lightfastRating: Rating;
  transparencyRating: Rating;
  granulationRating: Rating;
  stainingRating: Rating;
  _count: {
    swatchCard: number;
  };
};

async function getPaint<T extends { [key: string]: Promise<any> }>({
  uuid,
}: {
  uuid: string;
}): Promise<UnPromisifiedObject<T>> {
  const paintData = await prisma.paint.findUnique({
    where: {
      uuid,
    },
    select: paintPageSelect,
  });

  return paintData as UnPromisifiedObject<T>;
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const uuid = params.uuid;
  const paintData = (await getPaint({ uuid })) as PaintPageProps;

  const {
    id,
    name,
    line,
    hex,
    manufacturer,
    manufacturerDescription,
    communityDescription,
    lightfastRating,
    transparencyRating,
    granulationRating,
    stainingRating,
    _count,
  } = paintData;

  const HeaderSubtitle = () => {
    if (line) {
      return (
        <>
          {line.name} by{" "}
          <Link
            href={`/manufacturers/${manufacturer.slug}`}
            className="decorate-link"
          >
            {manufacturer.name}
          </Link>
        </>
      );
    } else {
      return (
        <Link
          href={`/manufacturers/${manufacturer.slug}`}
          className="decorate-link"
        >
          {manufacturer.name}
        </Link>
      );
    }
  };

  return (
    <>
      <PageHeader
        title={name}
        subtitle={<HeaderSubtitle />}
        simpleBreadcrumbs={true}
      >
        {/* TODO: Add User/Admin Buttons */}
        {/* https://github.com/genevievecurry/paint-library-app/blob/c0e46bbc54d6528b42e1193d7b8a853420639c18/src/routes/paint/%5Buuid%5D/%5Bslug%5D.svelte#L387-L547 */}
      </PageHeader>
      <div>
        {_count.swatchCard > 0 ? (
          <SwatchCardCollection paintId={id} />
        ) : (
          <div
            style={{
              borderColor: hex,
              backgroundColor: `${hex}22`,
            }}
            className="p-3 grid place-items-center border-2"
          >
            <div className="text-center m-3">
              <div>
                <p className="font-bold text-2xl">No swatches added yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
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
            <PigmentCardCollection paintId={id} />
          </section>
        </div>
        {manufacturerDescription && manufacturer && (
          <div className="col-span-2">
            <section className="mt-8">
              <div className="flex justify-start items-center">
                <h2 className="font-bold text-2xl">Manufacturer Description</h2>
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
      <section className="mt-8">
        <h2 className="font-bold text-2xl mb-4">Artist Notes</h2>
        <NoteCollection paintId={id} />
      </section>
    </>
  );
}
