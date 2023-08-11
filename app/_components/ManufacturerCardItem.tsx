"use client";
import { useRouter } from "next/navigation";

type ManufacturerCardItemProps = {
  manufacturer: {
    name: string;
    slug: string;
    _count: {
      paints: number;
    };
  };
};

export function ManufacturerCardItem(props: ManufacturerCardItemProps) {
  const router = useRouter();
  const { manufacturer } = props;

  return (
    <div
      onClick={() => router.push(`/manufacturers/${manufacturer.slug}`)}
      className="cursor-pointer border p-4"
    >
      <h3 className="font-bold text-lg mb-3">
        <span className="font-bold decorate-link">{manufacturer.name}</span>
      </h3>
      {manufacturer._count.paints} paints
    </div>
  );
}
