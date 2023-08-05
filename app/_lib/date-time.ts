export const timeAgo = ({
  agoDate,
  nowDate = new Date(),
}: {
  agoDate: Date | null | undefined;
  nowDate?: Date;
}): string => {
  if (!agoDate) return "";
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const secondsBetween = Math.abs(Number(agoDate) - Number(nowDate)) / 1000;
  const minutesBetween = Math.floor(secondsBetween / 60);
  const hoursBetween = Math.floor(secondsBetween / (60 * 60));
  const daysBetween = Math.floor(secondsBetween / (60 * 60 * 24));
  const monthsBetween = Math.floor(secondsBetween / (60 * 60 * 24 * 30));
  const yearsBetween = Math.floor(secondsBetween / (60 * 60 * 24 * 365));

  if (yearsBetween > 0) return rtf.format(-yearsBetween, "year");
  if (monthsBetween > 0) return rtf.format(-monthsBetween, "month");
  if (daysBetween > 0) return rtf.format(-daysBetween, "day");
  if (hoursBetween > 0) return rtf.format(-hoursBetween, "hour");
  if (minutesBetween > 0) return rtf.format(-minutesBetween, "minute");
  if (secondsBetween > 0) return rtf.format(-secondsBetween, "second");

  return "just now";
};

export const formattedDate = (
  createdAt: string | number | Date | null | undefined
): string => {
  if (!createdAt) return "";
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
