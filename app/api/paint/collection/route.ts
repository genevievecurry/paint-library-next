import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

const paintCardCollectionSelect: Prisma.PaintSelect = {
  published: true,
  uuid: true,
  slug: true,
  hex: true,
  name: true,
  pigmentsOnPaints: {
    select: {
      pigment: {
        select: {
          slug: true,
          type: true,
          number: true,
          name: true,
          color: {
            select: {
              code: true,
              slug: true,
            },
          },
        },
      },
    },
  },
  _count: true,
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const count = Number(searchParams.get("count")) || 100;
  const set = Number(searchParams.get("set")) || 0;
  const showOnlySwatched =
    searchParams.get("showOnlySwatched") !== ("false" || null || undefined);
  const pigmentId = Number(searchParams.get("pigmentId")) || undefined;
  const orderByKey = searchParams.get("orderByKey") || "name";
  const orderByDirection = searchParams.get("orderByDirection") || "asc";
  const take = count ? count + set : undefined;

  const paintCardCollection = await prisma.paint.findMany({
    skip: set,
    take: take,
    where: {
      pigmentsOnPaints: {
        some: {
          pigment: {
            is: {
              id: pigmentId,
            },
          },
        },
      },
      published: true,
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
    select: paintCardCollectionSelect,
    orderBy: {
      [orderByKey]: orderByDirection,
    },
  });

  return NextResponse.json(paintCardCollection);
}
