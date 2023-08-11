export function pigmentCode(
  type: string,
  colorCode: string,
  number: number | null | undefined,
  slug: string
): string {
  let convertedType: string;

  if (!number || type === "ETC") return slug;

  const ciNumber = number.toString().replace(".", ":");

  switch (type) {
    case "CIPIGMENT":
      convertedType = "P";
      break;
    case "CINATURAL":
      convertedType = "N";
      break;
    default:
      convertedType = "";
  }

  return convertedType + colorCode + ciNumber;
}

export function pluralizeWord(count: number, word: string) {
  if (count === 1) return word;
  return `${word}s`;
}

type windowWithUmami = typeof window & {
  umami: {
    track: (eventElement: string, eventData: {}) => void;
    trackView: (url: string, referrer: string, websiteId: string) => void;
  };
};

export function trackEvent(eventName: string, eventData: {}) {
  try {
    const windowWithUmami = window as unknown as windowWithUmami;
    const umami = windowWithUmami.umami;
    umami.track(eventName, eventData);
  } catch (error: any) {
    console.warn && console.warn(error.message);
  }
}
