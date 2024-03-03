import { BookingController } from "@/domain/controller/booking.controller";
import { BookingEntity, BookingProps } from "@/domain/entity/Booking.entity";
import { DateTime } from "@/domain/service/dateTime.ds";
import { cookies } from "next/headers";

const getBooking = () => {
  const cookieStore = cookies();
  const booking = cookieStore.get("booking");
  return JSON.parse(booking?.value as string);
};

export default async function BookingCheckoutCard() {
  const booking = await getBooking();
  console.log("booking", booking);
  const createBooking = async (formData: FormData) => {
    "use server";
    const guest = formData.get("guests");
    const bookingData: BookingProps = {
      guests: guest as any,
      hotelId: booking.hotelId,
      roomId: booking.booking.roomId,
      userId: 1,
      checkinDate: booking.booking.checkinDate,
      checkoutDate: booking.booking.checkoutDate,
      price: booking.price,
    };
    const bookingController = new BookingController();
    bookingController.create(bookingData);
  };

  return (
    <form action={createBooking}>
      <div className="flex flex-col items-center gap-4 p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <h2 className="text-3xl font-bold">Booking Checkout</h2>
              <p className="text-xl font-bold">
                Total Price: <p className="font-normal">{booking.price}</p>
              </p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">Hotel</p>
                <p className="italic">{booking.hotel}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">Hotel Room</p>
                <p className="italic">{booking.roomDescription}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Check In</p>
              {DateTime.formatDateHumanized(booking.booking?.checkinDate)}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Check Out</p>
              {DateTime.formatDateHumanized(booking.booking?.checkoutDate)}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Guest (optional)</p>
              <input type="text" name="guests" />
            </div>
            <div className="flex flex-row gap-2">
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded shadow"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
