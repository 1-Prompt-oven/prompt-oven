import dayjs from "dayjs";

interface PeriodLabelResult {
  labels: string[]; // 사용자에게 표시될 라벨
  beginDate: string; // 검색 시작일
  endDate: string; // 검색 종료일
}

export const getLabelsAndDateRange = (
  period: string,
  unit: string
): PeriodLabelResult => {
  const today = dayjs();

  if (unit === "day") {
    // 최근 7일: 월, 화, 수, ...
    const labels = Array.from({ length: 7 }, (_, i) =>
      today.subtract(6 - i, "day").format("ddd") // "월", "화", ...
    );
    const beginDate = today.subtract(6, "day").format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");
    return { labels, beginDate, endDate };
  } else if (unit === "week") {
    // 최근 4주: 1week, 2week, ...
    const labels = Array.from({ length: 4 }, (_, i) => `${4 - i}week`);
    const beginDate = today.subtract(4, "week").startOf("week").format("YYYY-MM-DD");
    const endDate = today.endOf("week").format("YYYY-MM-DD");
    return { labels, beginDate, endDate };
  } else if (unit === "month") {
    // 최근 12개월: Jan, Feb, ...
    const labels = Array.from({ length: 12 }, (_, i) =>
      today.subtract(11 - i, "month").format("MMM") // "Jan", "Feb", ...
    );
    const beginDate = today.subtract(12, "month").startOf("month").format("YYYY-MM-DD");
    const endDate = today.endOf("month").format("YYYY-MM-DD");
    return { labels, beginDate, endDate };
  } else if (unit === "year") {
    // 최근 10년: 2020, 2021, ...
    const labels = Array.from({ length: 10 }, (_, i) =>
      today.subtract(9 - i, "year").format("YYYY") // "2020", "2021", ...
    );
    const beginDate = today.subtract(10, "year").startOf("year").format("YYYY-MM-DD");
    const endDate = today.endOf("year").format("YYYY-MM-DD");
    return { labels, beginDate, endDate };
  }

  // 기본값: 최근 7일
  const labels = Array.from({ length: 7 }, (_, i) =>
    today.subtract(6 - i, "day").format("ddd")
  );
  const beginDate = today.subtract(6, "day").format("YYYY-MM-DD");
  const endDate = today.format("YYYY-MM-DD");
  return { labels, beginDate, endDate };
};
