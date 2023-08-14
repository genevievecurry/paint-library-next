"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export function BreadCrumbs({
  simpleBreadcrumbs,
  title,
}: {
  simpleBreadcrumbs?: boolean;
  title: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  let pathElements = pathname.split("/").filter((el) => el);

  if (simpleBreadcrumbs)
    pathElements = [pathElements.findLast((el) => el) as string];

  if (searchQuery) {
    pathElements = [...pathElements, `?q=${searchQuery}`];
  }

  const crumbs = pathElements.map((el, index) => {
    let url = "";

    for (let i = 0; i < index; i++) {
      url += `/${pathElements[i]}`;
    }

    url += `/${el}`;

    return {
      url,
      title: el,
    };
  });

  const BreadCrumb = ({
    breadcrumb,
    index,
  }: {
    breadcrumb: { url: string; title: string };
    index: number;
  }) => {
    if (index < crumbs.length - 1) {
      return (
        <>
          <Link
            href={breadcrumb.url}
            className="decorate-link inline-block mx-2 capitalize"
          >
            {breadcrumb.title}
          </Link>
          <span className="text-gray-400">/</span>
        </>
      );
    } else {
      return <span className="inline-block mx-2">{title}</span>;
    }
  };

  return (
    <>
      {crumbs.map((breadcrumb, index) => (
        <BreadCrumb breadcrumb={breadcrumb} index={index} key={index} />
      ))}
    </>
  );
}
