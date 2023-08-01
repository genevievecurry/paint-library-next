import type {
  GranulationRating,
  LightfastRating,
  StainingRating,
  TransparencyRating,
} from "@prisma/client";

export default function PaintRatings({
  lightfastRating,
  transparencyRating,
  granulationRating,
  stainingRating,
}: {
  lightfastRating: LightfastRating;
  transparencyRating: TransparencyRating;
  granulationRating: GranulationRating;
  stainingRating: StainingRating;
}) {
  const RatingCode = ({ code }: { code: string }) => {
    if (code !== "X") {
      return (
        <span className="border-2 border-black font-bold px-1 mr-1">
          {code}
        </span>
      );
    } else {
      return (
        <span className="border-2 border-gray-400 font-bold px-1 mr-1 text-gray-500">
          ?
        </span>
      );
    }
  };

  return (
    <>
      <table className="table-auto border-collapse border border-gray-400 mt-4 w-full">
        {/* LIGHTFASTNESS */}
        <tr>
          <th className="text-left border border-gray-400 px-4 py-3">
            Lightfastness
          </th>
          <td className="border border-gray-400 px-4 py-3">
            <RatingCode code={lightfastRating.code} />
          </td>
          <td className="border border-gray-400 px-4 py-3 w-full">
            {lightfastRating.label}
            <p className="text-gray-500 font-light text-sm">
              {lightfastRating.description}
            </p>
          </td>
        </tr>
        {/* TRANSPARENCY */}
        <tr>
          <th className="text-left border border-gray-400 px-4 py-3">
            Transparency
          </th>
          <td className="border border-gray-400 px-4 py-3">
            <RatingCode code={transparencyRating.code} />
          </td>
          <td className="border border-gray-400 px-4 py-3 w-full">
            {transparencyRating.label}
            <p className="text-gray-500 font-light text-sm">
              {transparencyRating.description}
            </p>
          </td>
        </tr>
        {/* Staining */}
        <tr>
          <th className="text-left border border-gray-400 px-4 py-3">
            Staining
          </th>
          <td className="border border-gray-400 px-4 py-3">
            <RatingCode code={stainingRating.code} />
          </td>
          <td className="border border-gray-400 px-4 py-3 w-full">
            {stainingRating.label}
            <p className="text-gray-500 font-light text-sm">
              {stainingRating.description}
            </p>
          </td>
        </tr>
        {/* Granulation */}
        <tr>
          <th className="text-left border border-gray-400 px-4 py-3">
            Granulation
          </th>
          <td className="border border-gray-400 px-4 py-3">
            <RatingCode code={granulationRating.code} />
          </td>
          <td className="border border-gray-400 px-4 py-3 w-full">
            {granulationRating.label}
            <p className="text-gray-500 font-light text-sm">
              {granulationRating.description}
            </p>
          </td>
        </tr>
      </table>
    </>
  );
}
