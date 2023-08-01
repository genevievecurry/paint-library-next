import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const uuid = req.query.uuid as string;
  if (session) {
    const result = await prisma.paint.findUnique({
      where: {
        uuid: uuid,
      },
    });
    res.json(result);
  } else {
    res.status(403);
  }
}
