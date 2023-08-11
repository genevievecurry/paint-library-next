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

const pigmentCardCollectionSelect: Prisma.PigmentSelect = {
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
};

export async function GET(request: Request) {
  if (!request.url) return NextResponse.error();
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("q");
  // Decodes the query string and replaces spaces with ampersands for search
  const formattedQuery = query
    ? decodeURIComponent(query).replace(/ /g, " & ")
    : "";

  const paintCardCollection = await prisma.paint.findMany({
    where: {
      name: {
        search: formattedQuery,
      },
      AND: [
        {
          published: true,
        },
      ],
    },
    orderBy: {
      _relevance: {
        fields: ["name", "manufacturerDescription"],
        sort: "asc",
        search: formattedQuery,
      },
    },
    select: paintCardCollectionSelect,
  });

  const pigmentCardCollection = await prisma.pigment.findMany({
    where: {
      name: {
        search: formattedQuery,
      },
    },
    select: pigmentCardCollectionSelect,
  });

  return NextResponse.json({
    paintCardCollection: paintCardCollection,
    pigmentCardCollection: pigmentCardCollection,
  });
}
