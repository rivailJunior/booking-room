import { BookingController } from "@/domain/controller/booking.controller";
import { BookingTable } from "@/components";
import { getLoginCookie } from "@/service/login";
import { redirect } from "next/navigation";
const bookingController = new BookingController();

const getBooking = async () => {
  return await bookingController.getAll(1);
};

async function BookingList() {
  const user = await getLoginCookie();
  if (!user) {
    redirect("/");
  }
  const bookings = await getBooking();

  return <BookingTable bookings={bookings} />;
}

export default BookingList;
