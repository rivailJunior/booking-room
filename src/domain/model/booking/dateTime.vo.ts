import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

export interface IDateTime {
  extractNumberOfDays: (startDate: Date, endDate: Date) => Promise<number>;
}

export class DateTime {
  constructor() {}
  static extractNumberOfDays(startDay: Date, endDay: Date) {
    const startDate = dayjs(startDay);
    const endDate = dayjs(endDay);
    const totalDays = endDate.diff(startDate, "day");
    if (totalDays < 0) {
      throw new Error("The dates are not correct");
    }
    return totalDays;
  }

  static isBetween(startDate: Date, endDate: Date, date: Date) {
    this.extractNumberOfDays(startDate, endDate);
    dayjs.extend(isBetween);
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return dayjs(date).isBetween(start, end);
  }
}
