import type { Prisma } from "@prisma/client";

export const pigmentSelect: Prisma.PigmentSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  type: true,
  name: true,
  number: true,
  hex: true,
  alternateNames: true,
  toxicity: true,
  reviewed: true,
  description: true,
  notes: true,
  lightfastRatingCode: true,
  lightfastRating: {
    select: {
      code: true,
      label: true,
      description: true,
    },
  },
  composition: true,
  transparencyRating: true,
  color: {
    select: {
      code: true,
      label: true,
      slug: true,
      hex: true,
    },
  },
  imageKitUploadId: true,
  imageKitUpload: true,
  slug: true,
  _count: true,
};
