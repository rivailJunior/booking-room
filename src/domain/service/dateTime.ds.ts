import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

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
    const start = this.formatDate(startDate);
    const end = this.formatDate(endDate);
    return dayjs(date).isBetween(start, end, "day", "[)");
  }

  static isValid(date: Date | string) {
    return dayjs(date).isValid();
  }

  static formatDate(date: Date | string) {
    return dayjs(date).toDate();
  }

  static formatDateHumanized(date: Date | string) {
    return dayjs(date).format("YYYY-MM-DD");
  }
}
