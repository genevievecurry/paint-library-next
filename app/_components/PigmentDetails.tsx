import type { Rating } from "./PaintRatings";
import { PigmentCodeComponent } from "./PigmentCodeComponent";
import type { Pigment } from "@prisma/client";
import type { Color } from "@prisma/client";

export type PigmentDetailsProps = {
  pigment: Pigment & {
    color: Color;
    lightfastRating: Rating;
    transparencyRating: Rating;
  };
};

export function PigmentDetails(props: PigmentDetailsProps) {
  const pigmentToxicity = () => {
    if (toxicity === "A") return "Low";
    if (toxicity === "B") return "Possible";
    if (toxicity === "C") return "High";
    if (toxicity === "D") return "Extreme";
    return <span className="text-gray-500">?</span>;
  };

  const { pigment } = props;

  const {
    color,
    type,
    number,
    lightfastRating,
    transparencyRating,
    reviewed,
    description,
    composition,
    alternateNames,
    toxicity,
    slug,
  } = pigment;

  return (
    <table className="table-auto border-collapse border border-gray-400 w-full">
      <tbody>
        <tr className="block md:table-row">
          <th className="inline-block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
            <span className="whitespace-nowrap">CI Name</span>
          </th>
          <td className="inline-block md:table-cell md:border border-gray-400 px-4 py-3 md:text-center align-top">
            <span className="border-2 border-black font-bold px-2">
              <PigmentCodeComponent
                type={type}
                colorCode={color.code}
                number={number}
                slug={slug}
              />
            </span>
          </td>
          <td className="block md:table-cell border-b md:border border-gray-400 px-4 py-3 w-full align-top">
            <p className="mb-2">
              CI stands for Color Index. It is a short code that easily
              identifies the pigment. Not all pigments have one.
            </p>

            {number ? (
              <ul className="list-disc ml-3 pl-3 text-gray-600 font-light text-sm">
                {type === "CIPIGMENT" && (
                  <li className="mb-1 leading-snug">
                    <strong>P</strong> designates that this pigment may be
                    organic or inorganic, and may be composed of naturally
                    occuring minerals, synthetic materials, or lakes.
                  </li>
                )}

                {type === "CINATURAL" && (
                  <li className="mb-1 leading-snug">
                    <strong>N</strong> designates that this is a naturally
                    occuring pigment, composed of plant, animal, or organic
                    natural earths.
                  </li>
                )}

                <li className="mb-1 leading-snug">
                  <strong>{color.code}</strong> is shorthand for {color.label}.
                </li>
                <li className="mb-1 leading-snug">
                  <strong>{number.toString().replace(".", ":")}</strong> is the
                  CI serial number.
                </li>
              </ul>
            ) : (
              <></>
            )}
          </td>
        </tr>
        <tr className="block md:table-row">
          <th className="inline-block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
            <span className="whitespace-nowrap">Toxicity</span>
          </th>
          <td className="inline-block md:table-cell md:border border-gray-400 px-4 py-3 md:text-center align-top">
            <span className="border-2 border-black font-bold px-2">
              {pigmentToxicity()}
            </span>
          </td>
          <td className="block md:table-cell border-b md:border border-gray-400 px-4 py-3 w-full align-top">
            <p>
              The general rule of thumb to follow is to not inhale, ingest, feed
              to pets or babies, pour on the ground, or leave on skin.
            </p>
            <p className="text-gray-600 font-light text-sm mt-2">
              All pigments should be assumed to be dangerous, and potentially
              lethal if mishandled. If the pigment has high or extreme toxicity,
              it might be better not to use it at all.
            </p>
          </td>
        </tr>
        <tr className="block md:table-row">
          <th className="inline-block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
            Lightfastness
          </th>
          <td className="inline-block md:table-cell md:border border-gray-400 px-4 py-3 md:text-center align-top">
            {lightfastRating.code !== "X" ? (
              <span className="border-2 border-black font-bold px-2">
                {lightfastRating.code}
              </span>
            ) : (
              <span className="border-2 border-black font-bold px-2 text-gray-500">
                ?
              </span>
            )}
          </td>
          <td className="block md:table-cell border-b md:border border-gray-400 px-4 py-3 w-full align-top">
            {lightfastRating.label}
            <p className="text-gray-600 font-light text-sm">
              {lightfastRating.description}
            </p>
          </td>
        </tr>
        <tr className="block md:table-row">
          <th className="inline-block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
            Transparency
          </th>
          <td className="inline-block md:table-cell md:border border-gray-400 px-4 py-3 md:text-center align-top">
            {transparencyRating.code !== "X" ? (
              <span className="border-2 border-black font-bold px-2">
                {transparencyRating.code}
              </span>
            ) : (
              <span className="border-2 border-black font-bold px-2 text-gray-500">
                ?
              </span>
            )}
          </td>
          <td className="block md:table-cell md:border border-gray-400 px-4 py-3 align-top">
            {transparencyRating.label}
            <p className="text-gray-600 font-light text-sm">
              {transparencyRating.description}
            </p>
          </td>
        </tr>
        {reviewed && description && (
          <tr className="block md:table-row">
            <th className="block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
              Description
            </th>

            <td
              className="block md:table-cell md:border border-gray-400 px-4 py-3"
              colSpan={2}
            >
              {description}
            </td>
          </tr>
        )}
        {reviewed && composition && (
          <tr className="block md:table-row">
            <th className="block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
              Composition
            </th>

            <td
              className="block md:table-cell md:border border-gray-400 px-4 py-3"
              colSpan={2}
            >
              {composition}
            </td>
          </tr>
        )}
        {reviewed && alternateNames && (
          <tr className="block md:table-row">
            <th className="block md:table-cell text-left md:border border-gray-400 px-4 py-3 align-top">
              Alternate Names
            </th>

            <td
              className="block md:table-cell md:border border-gray-400 px-4 py-3"
              colSpan={2}
            >
              {alternateNames}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
