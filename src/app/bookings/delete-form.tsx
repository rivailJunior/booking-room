"use client";

import { BookingService } from "@/domain/service/booking.ds";
import { DateTime } from "@/domain/service/dateTime.ds";
import { Booking } from "@prisma/client";
import React from "react";
import { useFormState } from "react-dom";
import { deleteSubmitAction } from "./service/delete-booking";

const initialState = {
  success: false,
};
export default function DeleteForm({ booking }: any) {
  const [state, formAction] = useFormState(deleteSubmitAction, initialState);

  return (
    <>
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
        {BookingService.priceFormatter().format(booking?.price as any)}
      </td>
      <td className="px-6 py-4">
        <form action={formAction}>
          <input type="hidden" name="id" value={booking.id} />
          <button
            type="submit"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Cancel Booking
          </button>
        </form>
      </td>
    </>
  );
}
