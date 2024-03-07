import { BookingDao } from "../model/booking/booking.dao";
import { BookingEntity, BookingProps } from "../entity/Booking.entity";
import { DateTime } from "../service/dateTime.ds";

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

    if (bookingRoom.length) {
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
    }

    return await bookingDao.create(data);
  }

  async update(data: BookingEntity) {
    const bookingDao = new BookingDao();
    return await bookingDao.update(data, data.id as number);
  }

  async delete(bookingId: number) {
    const bookingDao = new BookingDao();
    return await bookingDao.delete(bookingId);
  }
  async getAll(userId: number) {
    const bookingDao = new BookingDao();
    const bookings = await bookingDao.findMyBooking(userId);
    if (bookings.length) {
      return bookings.map((booking) => {
        return {
          ...booking,
          price: booking.price.toString(),
        };
      });
    }
    return bookings;
  }

  async getLast(userId: number) {
    const bookingDao = new BookingDao();
    return await bookingDao.getLastBooking(userId);
  }

  async getById(bookingId: number) {
    const bookingDao = new BookingDao();
    const response = await bookingDao.findBookingById(bookingId);
    const booking = {
      ...response,
      hotelRoom: {
        ...response?.hotelRoom,
        dayPrice: response?.hotelRoom?.dayPrice.toString(),
      },
      price: response?.price.toString(),
    };

    return booking;
  }
}
