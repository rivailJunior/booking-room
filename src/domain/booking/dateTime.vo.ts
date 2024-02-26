import dayjs from "dayjs";

export interface IDateTime {
  extractNumberOfDays: (startDate: Date, endDate: Date) => Promise<number>;
}

export class DateTime {
  constructor() {}
  static async extractNumberOfDays(startDay: Date, endDay: Date) {
    const startDate = dayjs(startDay);
    const endDate = dayjs(endDay);
    const totalDays = endDate.diff(startDate, "day");
    if (totalDays < 0) {
      throw new Error("The dates are not correct");
    }
    return totalDays;
  }
}
