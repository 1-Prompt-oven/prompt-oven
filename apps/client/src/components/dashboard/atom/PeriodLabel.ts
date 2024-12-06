import dayjs from "dayjs";

export const getLabels = (period: string, unit: string): string[] => {
  const today = dayjs();

  if (unit === "day") {
    return Array.from(
      { length: 7 },
      (_, i) => today.subtract(6 - i, "day").format("dddd")
    );
  } else if (unit === "week") {
    return Array.from(
      { length: 4 },
      (_, i) =>
        `Week ${1 + i} (${today.subtract(4 - i, "week").format("MM/DD")})`
    );
  } else if (unit === "month") {
    return Array.from(
      { length: 12 },
      (_, i) => today.subtract(11 - i, "month").format("MMM")
    );
  } else if (unit === "year") {
    return Array.from(
      { length: 10 },
      (_, i) => today.subtract(9 - i + 1, "year").format("YYYY")
    );
  }
    return Array.from(
      { length: 7 },
      (_, i) => today.subtract(6 - i, "day").format("dddd")
    );
  
};
