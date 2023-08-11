import { pigmentCode } from "@/lib/utilities";

export function PigmentCodeComponent({
  type,
  colorCode,
  number,
  slug,
}: {
  type: string;
  number?: number | null | undefined;
  colorCode: string;
  slug: string;
}) {
  if (!number) return <span className="text-gray-400">N/A</span>;

  return <span>{pigmentCode(type, colorCode, number, slug)}</span>;
}
