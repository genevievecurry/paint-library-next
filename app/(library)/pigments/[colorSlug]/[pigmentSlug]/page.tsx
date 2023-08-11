import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

import { pigmentSelect } from "./_selects";
import { Metadata } from "next";
import { ExternalLink, PageHeader } from "@/components/client";
import { PaintCardCollection, PigmentDetails } from "@/components/server";

import type { Color, ImageKitUpload, Pigment, Paint } from "@prisma/client";
import type { Rating } from "@/components/PaintRatings";

export async function generateMetadata({
  params,
}: {
  params: { pigmentSlug: string };
}): Promise<Metadata> {
  const slug = params.pigmentSlug;

  const pigment = await prisma.pigment
    .findUnique({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    })
    .then((res) => res);

  if (!pigment) return {};

  return {
    title: pigment.name,
  };
}

async function getPigment<T extends { [key: string]: Promise<any> }>({
  pigmentSlug,
}: {
  pigmentSlug: string;
}): Promise<UnPromisifiedObject<T>> {
  const pigmentData = await prisma.pigment.findUnique({
    where: {
      slug: decodeURIComponent(pigmentSlug),
    },
    select: pigmentSelect,
  });

  return pigmentData as UnPromisifiedObject<T>;
}

export type PigmentPageProps = Pigment & {
  color: Color;
  imageKitUpload: ImageKitUpload;
  paints: Paint[];
  lightfastRating: Rating;
  transparencyRating: Rating;
  _count: {
    paints: number;
  };
};

export default async function Page({
  params,
}: {
  params: { pigmentSlug: string };
}) {
  const pigmentSlug = params.pigmentSlug;
  const pigmentData = (await getPigment({ pigmentSlug })) as PigmentPageProps;

  const { id, name, imageKitUploadId, hex, color, imageKitUpload, _count } =
    pigmentData;

  const displayHex = hex ? hex : color.hex;

  return (
    <>
      <PageHeader title={name}></PageHeader>

      <section className="grid gap-3 grid-cols-2 md:grid-cols-4 2xl:grid-cols-6">
        <div className="relative col-span-1">
          <div className="border-2 border-black p-1">
            <div
              className="aspect-square"
              style={{ backgroundColor: displayHex }}
            >
              {imageKitUploadId && (
                <Image
                  loading="lazy"
                  src={imageKitUpload.url}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-all opacity-100 hover:opacity-0"
                  alt={name}
                />
              )}
            </div>
          </div>
        </div>
        <div className="ml-0 lg:ml-3 col-span-2 md:col-span-3">
          <PigmentDetails pigment={pigmentData} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-bold text-3xl">Paints</h2>
        <p className="text-gray-500 font-light mt-2 mb-6">
          {_count.paints > 0 ? (
            <>The following paints likely use this pigment.</>
          ) : (
            <> No paint in this database is currently linked to this pigment.</>
          )}
        </p>

        {_count.paints > 0 && (
          <>
            <h3 className="font-bold text-xl mb-3">
              Single-Pigment Watercolors
            </h3>

            <PaintCardCollection
              pigmentId={id}
              pigmentComposition="single"
              orderBy={{ name: "asc" }}
              emptyMessage={
                <p className="text-gray-500 font-light mt-2 mb-6 text-sm">
                  No single-pigment watercolors found in Paint Library that use{" "}
                  {pigmentData.name}.
                </p>
              }
            >
              <p className="text-gray-500 font-light mt-2 mb-6 text-sm">
                The paints listed here are not guaranteed to be single-pigment,
                but we found {name} listed as the only known pigment in our
                database.
              </p>
            </PaintCardCollection>
          </>
        )}
      </section>

      {_count.paints > 0 && (
        <section className="mt-10">
          <h3 className="font-bold text-xl mb-3">Multi-Pigment Watercolors</h3>

          <PaintCardCollection
            pigmentId={id}
            pigmentComposition="multi"
            orderBy={{ name: "asc" }}
            emptyMessage={
              <p className="text-gray-500 font-light mt-2 mb-6 text-sm">
                No multi-pigment watercolors found in Paint Library that use{" "}
                {pigmentData.name}.
              </p>
            }
          ></PaintCardCollection>
        </section>
      )}

      <section className="mt-10 max-w-2xl">
        <h2 className="font-bold text-3xl">More Information</h2>
        <p className="font-light my-4">
          Information on this website related to pigments has the distict
          possibility of being incorrect, out of date, or baffling. It is
          offered for the main purpose of being able to thoughtfully compare
          paints based on their composition, which also might be incorrect or
          out of date.
        </p>
        <p className="font-light my-4">
          Please do your own independent research about pigments if you are
          interested in mixing your own paints. Check out the{" "}
          <ExternalLink url="http://www.artiscreation.com/Color_index_names.html">
            Art is Creation Pigment Database
          </ExternalLink>
          , or&nbsp;
          <ExternalLink url="https://handprint.com/HP/WCL/water.html">
            handprint
          </ExternalLink>
          .
        </p>
        <p className="font-light my-4">
          If you want to help update pigment information, or want to just share
          something that can be fixed, you can send an email to{" "}
          <Link
            href="mailto:librarian@paintlibrary.art"
            className="decorate-link cursor-pointer"
          >
            librarian@paintlibrary.art
          </Link>
          .
        </p>
      </section>
    </>
  );
}
