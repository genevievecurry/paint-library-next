import { Color } from "@prisma/client";
import Link from "next/link";

export type ColorNavigation = Color & {
  _count: {
    pigments: number;
  };
};

export function ColorNavigation(props: { colors: ColorNavigation[] }) {
  const { colors } = props;

  return (
    <>
      <aside className="col-span-6 md:col-span-1">
        <div className="sticky top-0 py-2">
          <span className="block text-xl font-bold">Hue</span>
          <ul className="mt-3 text-lg">
            {colors.map((color) => (
              <li className="my-1" key={color.id}>
                <Link
                  className={`pr-2 transition-all ${
                    color.slug === "Y"
                      ? "pl-6 font-medium"
                      : "pl-2 text-gray-500 font-light"
                  }`}
                  href={`#${color.slug}`}
                >
                  <span className="decorate-link inline-block">
                    {color.label}
                  </span>
                  <span className="text-sm ml-2">{color._count.pigments}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
