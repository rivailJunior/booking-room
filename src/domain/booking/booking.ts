import { connection } from "@/infra/data-base";
import dayjs from "dayjs";

interface IBooking {
  hotelId: number;
  roomId: number;
  userId: number;
  guests: string;
  checkinDate: Date;
  checkoutDate: Date;
}
export class BookingDao {
  constructor() {}

  async extractNumberOfDays(startDay: string, endDay: string) {
    const startDate = dayjs(startDay);
    const endDate = dayjs(endDay);
    const totalDays = endDate.diff(startDate, "day");
    if (totalDays < 0) {
      throw new Error("The dates are not correct");
    }
    return totalDays;
  }

  async findMyBooking(userId: number) {
    return await connection.booking.findMany({
      where: {
        userId,
      },
    });
  }

  async create(data: IBooking) {
    const response = await connection.booking.create({
      data,
    });
    return response;
  }

  async delete(bookingId: number) {
    const response = await connection.booking.delete({
      where: {
        id: bookingId,
      },
    });
    return response;
  }

  async update(data: Partial<IBooking>, bookingId: number) {
    // const updatedAt = dayjs().format();
    // console.log("updated data", updatedAt, bookingId);
    // data[0].updatedAt = updatedAt;
    const response = await connection.booking.update({
      where: {
        id: bookingId,
      },
      data,
    });
    return response;
  }
}
