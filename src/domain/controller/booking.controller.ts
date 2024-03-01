import { BookingDao } from "../model/booking/booking.dao";
import { BookingEntity, BookingProps } from "../entity/Booking.entity";
import { DateTime } from "../model/booking/dateTime.vo";

/**
 * should be used by the front-end
 */
export class BookingController {
  constructor() {}
  async create(data: BookingProps): Promise<BookingEntity | null> {
    const bookingDao = new BookingDao();
    const bookingRoom = await bookingDao.findRoomBooking(
      data.roomId,
      data.hotelId
    );

    const hasBookingOnThisPeriod = bookingRoom?.every((booking: any) => {
      if (
        DateTime.isBetween(
          booking.checkinDate,
          booking.checkoutDate,
          data.checkinDate
        ) ||
        DateTime.isBetween(
          booking.checkinDate,
          booking.checkoutDate,
          data.checkoutDate
        )
      ) {
        return booking;
      }
    });
    if (hasBookingOnThisPeriod) {
      throw new Error("Room is not available on this period");
    }
    const response = await bookingDao.create(data);
    return response;
  }

  async update(data: BookingEntity) {
    const bookingDao = new BookingDao();
    return await bookingDao.update(data, data.id);
  }

  async delete(bookingId: number) {
    const bookingDao = new BookingDao();
    return await bookingDao.delete(bookingId);
  }
  async getAll(userId: number) {
    const bookingDao = new BookingDao();
    return await bookingDao.findMyBooking(userId);
  }

  async getLast(userId: number) {
    const bookingDao = new BookingDao();
    return await bookingDao.getLastBooking(userId);
  }
}
