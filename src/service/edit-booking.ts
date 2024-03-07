import { BookingController } from "@/domain/controller/booking.controller";

export async function getBookingById(bookingId: number) {
  const bookingController = new BookingController();
  return await bookingController.getById(bookingId);
}
