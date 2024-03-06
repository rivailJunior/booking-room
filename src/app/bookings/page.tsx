import { BookingController } from "@/domain/controller/booking.controller";

import DeleteForm from "./delete-form";
import { BookingService } from "@/domain/service/booking.ds";
const bookingController = new BookingController();

const getBooking = async () => {
  return await bookingController.getAll(1);
};

async function BookingList() {
  const bookings = await getBooking();

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
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={booking.id}
                >
                  <DeleteForm booking={booking} />
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
