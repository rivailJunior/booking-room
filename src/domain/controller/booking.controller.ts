import { BookingDao } from "../model/booking/booking.dao";
import { BookingEntity, BookingProps } from "../entity/Booking.entity";

/**
 * should be used by the front-end
 */
export class BookingController {
  constructor() {}
  async create(data: BookingProps): Promise<BookingEntity> {
    const bookingDao = new BookingDao();
    const response = await bookingDao.create(data);
    //todo: apply any other logic here if necessary
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
