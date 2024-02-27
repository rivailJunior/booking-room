import connection from "@/infra/data-base";
import dayjs from "dayjs";
import { DateTime } from "./dateTime.vo";
import { BookingEntity, BookingProps } from "../../entity/Booking.entity";
import { IBookingDao } from "../../interface/booking.interface";

export class BookingDao implements IBookingDao {
  constructor() {}

  async findMyBooking(userId: number) {
    return await connection.booking.findMany({
      where: {
        userId,
      },
    });
  }

  async create(data: BookingProps) {
    await DateTime.extractNumberOfDays(data.checkinDate, data.checkoutDate);
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

  async update(data: BookingEntity, bookingId: number) {
    await DateTime.extractNumberOfDays(
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
