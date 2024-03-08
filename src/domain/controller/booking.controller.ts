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

  async update(data: Partial<BookingEntity>) {
    const bookingDao = new BookingDao();
    const booking = await bookingDao.getBookingDataById(data.id as number);
    const id = data.id;
    if (booking) {
      // @ts-ignore
      delete booking.id;
      delete data.id;
    }
    return await bookingDao.update({ ...booking, ...data }, id as number);
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
    const roomBookings = await bookingDao.findRoomBookings(
      response?.roomId as number
    );

    const invalidDates = roomBookings?.map((room) => {
      return {
        startDate: DateTime.formatDateHumanized(room.checkinDate),
        endDate: DateTime.formatDateHumanized(room.checkoutDate),
      };
    });

    const booking = {
      ...response,
      hotelRoom: {
        ...response?.hotelRoom,
        dayPrice: response?.hotelRoom?.dayPrice.toString(),
      },
      price: response?.price.toString(),
      invalidDates,
    };

    return booking;
  }
}
