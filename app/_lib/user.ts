import type { Prisma } from "@prisma/client";

export const limitedUserSelect: Prisma.UserSelect = {
  username: true,
  role: true,
  status: true,
  uuid: true,
};
