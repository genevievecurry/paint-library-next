import Link from "next/link";
import { BreadCrumbs } from "../BreadCrumbs";
import { Suspense } from "react";

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
  return (
    <>
      <header className="my-7 md:flex justify-between">
        <div className="mb-4">
          <div className="mb-4 font-light">
            <Link href="/" className="decorate-link inline-block pr-2">
              Paint Library
            </Link>
            <span className="text-gray-400">/</span>
            <Suspense>
              <BreadCrumbs
                simpleBreadcrumbs={simpleBreadcrumbs}
                title={title}
              />
            </Suspense>
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
