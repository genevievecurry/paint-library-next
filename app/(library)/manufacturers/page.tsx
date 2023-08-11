import { ManufacturerCardItem } from "@/components/ManufacturerCardItem";
import { PageHeader } from "@/components/PageHeader";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

import type { Manufacturer } from "@prisma/client";
import { ManufacturersTable } from "@/components/ManufacturersTable";

export function generateMetadata(): Metadata {
  return {
    title: "Manufacturers",
  };
}

type ManufacturerPageProps = Manufacturer & {
  _count: {
    paints: number;
    swatchCard: number;
  };
};

async function getManufacturers<
  T extends { [key: string]: Promise<any> }
>(): Promise<UnPromisifiedObject<T>> {
  const manufacturers = await prisma.manufacturer.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      sellPaint: true,
      sellPaper: true,
      lines: true,
      _count: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return manufacturers as UnPromisifiedObject<T>;
}

export default async function Page() {
  const manufacturers = (await getManufacturers()) as ManufacturerPageProps[];

  const manufacturersWithPaints = manufacturers.filter(
    (manufacturer) => manufacturer._count.paints > 1
  );

  return (
    <>
      <PageHeader title="Manufacturers"></PageHeader>

      <section className="mb-10">
        <h2 className="font-bold text-3xl mb-6">Browse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-row gap-4">
          {manufacturersWithPaints.map((manufacturer) => (
            <ManufacturerCardItem
              manufacturer={manufacturer}
              key={manufacturer.id}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-3xl mb-6">All Manufacturers</h2>
        <p className="my-5 max-w-xl">
          This list includes manufacturers we may not currently have paint
          entries for in Paint Library, as well as manufacturers that produce
          art paper.
        </p>
        <ManufacturersTable manufacturers={manufacturers} />
      </section>
    </>
  );
}
