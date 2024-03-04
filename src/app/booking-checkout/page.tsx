import { BookingController } from "@/domain/controller/booking.controller";
import { BookingProps } from "@/domain/entity/Booking.entity";
import { DateTime } from "@/domain/service/dateTime.ds";
import Image from "next/image";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getBooking = () => {
  const cookieStore = cookies();
  const booking = cookieStore.get("booking");
  return JSON.parse(booking?.value as string);
};

const deleteBooking = () => {
  const cookieStore = cookies();
  cookieStore.delete("booking");
};

const stringPriceToNumber = (price: string) => {
  return Number(price.replace(/\D/g, ""));
};

export default async function BookingCheckoutCard() {
  const booking = await getBooking();

  const createBooking = async (formData: FormData) => {
    "use server";
    const action = formData.get("button");
    if (action === "cancel") {
      await deleteBooking();
      redirect("/");
    } else {
      const guest = formData.get("guests");
      const price = stringPriceToNumber(booking.price);
      const bookingData: BookingProps = {
        guests: guest as any,
        hotelId: booking.hotelId,
        roomId: booking.booking.roomId,
        userId: 1,
        checkinDate: booking.booking.checkinDate,
        checkoutDate: booking.booking.checkoutDate,
        price,
      };
      const bookingController = new BookingController();
      await bookingController.create(bookingData);
      redirect("/bookings");
    }
  };

  return (
    <form action={createBooking}>
      <div className="flex flex-col gap-4 w-full md:w-3/4 mx-auto">
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row ">
            <div className="w-full alig flex flex-col gap-2">
              <h1 className="text-3xl font-normal text-blue-500">
                Your Booking
              </h1>
            </div>
            <span className="text-xl font-normal md:items-end flex flex-col text-gray-500">
              Total <p className="font-normal text-black">{booking.price}</p>
            </span>
          </div>

          <div className="flex flex-row my-5 w-full">
            <Image
              src={"/rooms/" + booking?.picture}
              alt="hotel"
              width={400}
              height={400}
              className="rounded-lg w-full object-cover md:h-64 lg:h-96"
            />
          </div>

          <div className="flex ">
            <div className="w-full md:flex-row flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-normal text-gray-500">Hotel</p>
                <p className="font-normal">{booking.hotel}</p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <p className="font-normal text-gray-500">Hotel Room</p>
                <p className="font-normal">{booking.roomDescription}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-normal text-gray-500">Check-In</p>
                <span className="font-normal">
                  {DateTime.formatDateHumanized(booking.booking?.checkinDate)}
                </span>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <p className="font-normal text-gray-500">Check Out</p>
                <span className="font-normal">
                  {DateTime.formatDateHumanized(booking.booking?.checkoutDate)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-normal text-gray-500">Guest (optional)</p>
              <input
                type="text"
                name="guests"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
              />
            </div>
            <div className="flex flex-row gap-2 justify-end">
              <button
                type="submit"
                value="cancel"
                name="button"
                className="px-8 py-3 bg-red-500 text-white rounded shadow"
              >
                Cancel
              </button>
              <button
                name="button"
                value="confirm"
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white rounded shadow"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
