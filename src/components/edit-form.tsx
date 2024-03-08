"use client";
import { BookingDatePicker } from "@/components";
import { InputWrapper } from "@/components/form";
import { BookingService } from "@/domain/service/booking.ds";
import { DateTime } from "@/domain/service/dateTime.ds";
import { updateBookingAction } from "@/service/edit-booking";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EditForm({ booking }: { booking: any }) {
  const [state, formAction] = useFormState(updateBookingAction, booking);
  console.log("state", state);
  const [price, setPrice] = useState(booking.price);
  const checkin = DateTime.formatDate(booking?.checkinDate);
  const checkout = DateTime.formatDate(booking?.checkoutDate);
  const [dates, setDates] = useState({
    checkinDate: booking.checkinDate,
    checkoutDate: booking.checkoutDate,
  });

  const handleChangeDates = (dates: { startDate: string; endDate: string }) => {
    const newPrice = BookingService.calculate(
      DateTime.formatDate(dates.startDate),
      DateTime.formatDate(dates.endDate),
      booking.hotelRoom?.dayPrice
    );
    setDates({ checkinDate: dates.startDate, checkoutDate: dates.endDate });
    setPrice(newPrice);
  };

  useEffect(() => {
    if (state?.success) {
      toast("Booking update successfully", {
        type: "success",
        closeOnClick: true,
      });
    }
    if (state?.error) {
      toast("Something went wrong!", {
        type: "error",
        closeOnClick: true,
      });
    }
  }, [state]);

  return (
    <div className="h-auto flex items-center bg-gray-100 max-w flex-col p-10">
      <ToastContainer />
      <div className="flex flex-col w-full">
        <div
          className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <p className="font-medium">Pay attention!</p> If you want to update
          the destination, you must first cancel the booking, check the
          reimbursement policy and then create a new booking.
        </div>
        <form action={formAction} className="w-full gap-4 flex flex-col">
          <input type="hidden" name="id" value={booking?.id} />
          <input type="hidden" name="price" value={price} />
          <input type="hidden" name="checkinDate" value={dates.checkinDate} />
          <input type="hidden" name="checkoutDate" value={dates.checkoutDate} />
          <div className="flex flex-row my-5 w-full">
            <Image
              src={"/rooms/" + booking?.hotelRoom?.pictures}
              alt="hotel"
              width={400}
              height={400}
              className="rounded-lg w-full object-cover md:h-64 lg:h-96"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-10 gap-4">
            <InputWrapper label="Price" error={""}>
              <div> {BookingService.priceFormatter().format(price)}</div>
            </InputWrapper>
            <InputWrapper label="Room description" error={""}>
              <div> {booking?.hotelRoom.description}</div>
            </InputWrapper>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-10 gap-4">
            <InputWrapper label="When will you go?" error={""}>
              <BookingDatePicker
                onHandleChange={handleChangeDates}
                startDate={checkin}
                endDate={checkout}
                disabledDates={booking.invalidDates}
              />
            </InputWrapper>

            <InputWrapper label="Guests" error={""}>
              <input
                type="text"
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Guests"
                value={booking?.guests}
                name="guests"
              />
            </InputWrapper>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-400 text-white font-normal py-2.5 rounded-lg px-5 mt-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-normal py-2.5 rounded-lg px-5 mt-4"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
