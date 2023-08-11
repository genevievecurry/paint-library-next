"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export function PageHeader({
  title,
  subtitle,
  description,
  owner,
  children,
  simpleBreadcrumbs = false,
}: {
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
  owner?: { username: string };
  children?: React.ReactNode;
  simpleBreadcrumbs?: boolean;
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
      <header className="my-7 md:flex justify-between">
        <div className="mb-4">
          <div className="mb-4 font-light">
            <Link href="/" className="decorate-link inline-block pr-2">
              Paint Library
            </Link>
            <span className="text-gray-400">/</span>
            {crumbs.map((breadcrumb, index) => (
              <BreadCrumb breadcrumb={breadcrumb} index={index} key={index} />
            ))}
          </div>
          <h1 className="font-extrabold text-5xl mb-2">{title}</h1>
          {description && <div className="my-5 max-w-xl">{description}</div>}
          {subtitle && <div className="mt-2 font-light">{subtitle}</div>}
          {owner && (
            <>
              By{" "}
              <Link href="/@{owner.username}" className="decorate-link">
                @{owner.username}
              </Link>
            </>
          )}
        </div>
        <div>{children}</div>
      </header>
    </>
  );
}
