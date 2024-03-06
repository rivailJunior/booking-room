import { BookingController } from "@/domain/controller/booking.controller";
import { BookingTable } from "@/components";
const bookingController = new BookingController();

const getBooking = async () => {
  return await bookingController.getAll(1);
};

async function BookingList() {
  const bookings = await getBooking();

  return <BookingTable bookings={bookings} />;
}

export default BookingList;
