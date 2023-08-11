import { PageHeader, PigmentCardItem } from "@/components/client";
import type { PigmentCardItemProps } from "@/components/client";
import prisma from "@/lib/prisma";

async function getColor<T extends { [key: string]: Promise<any> }>({
  colorSlug,
}: {
  colorSlug: string;
}): Promise<UnPromisifiedObject<T>> {
  const color = await prisma.color.findUnique({
    where: {
      slug: decodeURIComponent(colorSlug),
    },
  });

  return color as UnPromisifiedObject<T>;
}

async function getPigmentsByColor<T extends { [key: string]: Promise<any> }>({
  colorSlug,
}: {
  colorSlug: string;
}): Promise<UnPromisifiedObject<T>> {
  const pigments = await prisma.pigment.findMany({
    where: {
      color: {
        slug: decodeURIComponent(colorSlug),
      },
    },
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
    orderBy: {
      name: "asc",
    },
  });

  return pigments as UnPromisifiedObject<T>;
}

export default async function Page({
  params,
}: {
  params: { colorSlug: string };
}) {
  const colorSlug = params.colorSlug;
  const pigmentData = getPigmentsByColor({ colorSlug });
  const colorData = getColor({ colorSlug });

  const [pigments, color] = (await Promise.all([pigmentData, colorData])) as [
    PigmentCardItemProps[],
    { label: string }
  ];

  return (
    <>
      <PageHeader title={`${color.label} Pigments`} />

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {pigments.map((pigment) => (
          <PigmentCardItem key={pigment.slug} pigment={pigment} />
        ))}
      </section>
    </>
  );
}
