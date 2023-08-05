import { timeAgo, formattedDate } from "./date-time";

describe("timeAgo", () => {
  test("returns empty string if agoDate is null or undefined", () => {
    expect(timeAgo({ agoDate: null })).toBe("");
    expect(timeAgo({ agoDate: undefined })).toBe("");
  });

  test("returns 'just now' if agoDate is now", () => {
    const now = new Date();
    expect(timeAgo({ agoDate: now, nowDate: now })).toBe("just now");
  });

  test("returns '1 second ago' if agoDate is 1 second ago", () => {
    const now = new Date();
    const oneSecondAgo = new Date(now.getTime() - 1000);
    expect(timeAgo({ agoDate: oneSecondAgo, nowDate: now })).toBe(
      "1 second ago"
    );
  });

  test("returns '2 seconds ago' if agoDate is 2 seconds ago", () => {
    const now = new Date();
    const twoSecondsAgo = new Date(now.getTime() - 2000);
    expect(timeAgo({ agoDate: twoSecondsAgo, nowDate: now })).toBe(
      "2 seconds ago"
    );
  });

  test("returns '1 minute ago' if agoDate is 1 minute ago", () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 1000 * 60);
    expect(timeAgo({ agoDate: oneMinuteAgo, nowDate: now })).toBe(
      "1 minute ago"
    );
  });

  test("returns '1 hour ago' if agoDate is 1 hour ago", () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1000 * 60 * 60);
    expect(timeAgo({ agoDate: oneHourAgo, nowDate: now })).toBe("1 hour ago");
  });

  test("returns 'yesterday' if agoDate is 1 day ago", () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24);
    expect(timeAgo({ agoDate: oneDayAgo, nowDate: now })).toBe("yesterday");
  });

  test("returns '2 days ago' if agoDate is 2 days ago", () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2);
    expect(timeAgo({ agoDate: twoDaysAgo, nowDate: now })).toBe("2 days ago");
  });

  test("returns 'last month' if agoDate is 1 month ago", () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30);
    expect(timeAgo({ agoDate: oneMonthAgo, nowDate: now })).toBe("last month");
  });

  test("returns '2 months ago' if agoDate is 2 months ago", () => {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30 * 2);
    expect(timeAgo({ agoDate: twoMonthsAgo, nowDate: now })).toBe(
      "2 months ago"
    );
  });

  test("returns 'last year' if agoDate is 1 year ago", () => {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 365);
    expect(timeAgo({ agoDate: oneYearAgo, nowDate: now })).toBe("last year");
  });

  test("returns '2 years ago' if agoDate is 2 years ago", () => {
    const now = new Date();
    const twoYearsAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 365 * 2);
    expect(timeAgo({ agoDate: twoYearsAgo, nowDate: now })).toBe("2 years ago");
  });
});

describe("formattedDate", () => {
  test("returns empty string if createdAt is null or undefined", () => {
    expect(formattedDate(null)).toBe("");
    expect(formattedDate(undefined)).toBe("");
  });

  test("returns formatted date if createdAt is a Date", () => {
    const date = new Date("2022-08-01 02:00:38.825");
    expect(formattedDate(date)).toBe("August 1, 2022");
  });

  test("returns formatted date if createdAt is a string", () => {
    const date = "2022-08-01 02:00:38.825";
    expect(formattedDate(date)).toBe("August 1, 2022");
  });

  test("returns formatted date if createdAt is a number", () => {
    const date = 1627819238825;
    expect(formattedDate(date)).toBe("August 1, 2021");
  });
});
