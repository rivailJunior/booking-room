import dayjs from "dayjs";
import { DateTime } from "../model/booking/dateTime.vo";

export class BookingService {
  constructor() {}

  static calculate(checkinDate: Date, checkoutDate: Date, dayPrice: number) {
    const totalDays = DateTime.extractNumberOfDays(
      dayjs(checkinDate).toDate(),
      dayjs(checkoutDate).toDate()
    );
    return dayPrice * totalDays;
  }
}
