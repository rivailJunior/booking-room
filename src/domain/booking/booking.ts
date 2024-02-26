import { connection } from "@/infra/data-base";
import dayjs from "dayjs";
import { IDateTime } from "./dateTime.vo";

interface IBooking {
  hotelId: number;
  roomId: number;
  userId: number;
  guests: string;
  checkinDate: Date;
  checkoutDate: Date;
}
export class BookingDao {
  constructor(readonly dateTime: IDateTime) {}

  async findMyBooking(userId: number) {
    return await connection.booking.findMany({
      where: {
        userId,
      },
    });
  }

  async create(data: IBooking) {
    await this.dateTime.extractNumberOfDays(
      data.checkinDate,
      data.checkoutDate
    );
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

  async getLastBooking(userId: number) {
    const last = await this.findMyBooking(userId);
    return last[last.length - 1];
  }

  async update(data: Partial<IBooking>, bookingId: number) {
    await this.dateTime.extractNumberOfDays(
      data.checkinDate as Date,
      data.checkoutDate as Date
    );
    const updatedAt = dayjs().toDate();
    const response = await connection.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        ...data,
        updatedAt,
      },
    });
    return response;
  }
}
