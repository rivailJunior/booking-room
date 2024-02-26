import { BookingEntity, BookingProps } from "../entity/Booking.entity";

export interface IBookingDao {
  findMyBooking(userId: number): Promise<BookingEntity[]>;
  create(data: BookingProps): Promise<BookingEntity>;
  delete(bookingId: number): Promise<BookingEntity>;
  getLastBooking(userId: number): Promise<BookingEntity>;
  update(data: BookingEntity, bookingId: number): Promise<BookingEntity>;
}
