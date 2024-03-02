import dayjs from "dayjs";
import { DateTime } from "./dateTime.ds";

export class BookingService {
  static calculate(checkinDate: Date, checkoutDate: Date, dayPrice: number) {
    const totalDays = DateTime.extractNumberOfDays(
      dayjs(checkinDate).toDate(),
      dayjs(checkoutDate).toDate()
    );
    const amount = dayPrice * totalDays;
    return this.priceFormatter().format(amount);
  }

  static priceFormatter() {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}
