import { BookingController } from "@/domain/controller/booking.controller";
import { BookingService } from "@/domain/service/booking.ds";
import { DateTime } from "@/domain/service/dateTime.ds";
const bookingController = new BookingController();

const getBooking = async () => {
  return await bookingController.getAll(1);
};

async function BookingList() {
  const bookings = await getBooking();

  const onDelete = async () => {
    "use server";
  };
  return (
    <div className="w-full mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Guests
              </th>
              <th scope="col" className="px-6 py-3">
                Check-in
              </th>
              <th scope="col" className="px-6 py-3">
                Check-out
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return (
                <tr
                  key={booking.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {booking.guests}
                  </th>
                  <td className="px-6 py-4">
                    {DateTime.formatDateHumanized(booking?.checkinDate)}
                  </td>
                  <td className="px-6 py-4">
                    {DateTime.formatDateHumanized(booking?.checkoutDate)}
                  </td>
                  <td className="px-6 py-4">
                    {BookingService.priceFormatter().format(
                      booking?.price as any
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingList;
