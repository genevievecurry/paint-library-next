import { pigmentCode, pluralizeWord } from "./utilities";

describe("pigmentCode", () => {
  test("returns empty string if number is null or undefined", () => {
    expect(pigmentCode("CIPIGMENT", "Bk", null, "")).toBe("");
    expect(pigmentCode("CIPIGMENT", "Bk", undefined, "")).toBe("");
  });

  test("returns 'PBk35' if type is'CIPIGMENT'", () => {
    expect(pigmentCode("CIPIGMENT", "Bk", 35, "")).toBe("PBk35");
  });

  test("returns 'PBk35' if type is'CIPIGMENT'", () => {
    expect(pigmentCode("CIPIGMENT", "Bk", 35, "")).toBe("PBk35");
  });

  test("returns 'NY24' if type is CINATURAL", () => {
    expect(pigmentCode("CINATURAL", "Y", 24, "NY24")).toBe("NY24");
  });

  test("Returns slug, 'BV11', if type is ETC", () => {
    expect(pigmentCode("ETC", "V", 11, "BV11")).toBe("BV11");
  });

  test("returns 'PR49:1' if number is float", () => {
    expect(pigmentCode("CIPIGMENT", "R", 49.1, "")).toBe("PR49:1");
  });
});

describe("pluralizeWord", () => {
  test("returns 'paint' if count is 1", () => {
    expect(pluralizeWord(1, "paint")).toBe("paint");
  });

  test("returns 'paints' if count is 0", () => {
    expect(pluralizeWord(0, "paint")).toBe("paints");
  });

  test("returns 'paints' if count is 4", () => {
    expect(pluralizeWord(4, "paint")).toBe("paints");
  });
});
