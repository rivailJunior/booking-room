"use client";
import { BookingDatePicker } from "@/components";
import { InputWrapper } from "@/components/form";
import { BookingService } from "@/domain/service/booking.ds";
import { DateTime } from "@/domain/service/dateTime.ds";
import Head from "next/head";
import Image from "next/image";

export function EditForm({ booking }: { booking: any }) {
  const checkin = DateTime.formatDate(booking?.checkinDate);
  const checkout = DateTime.formatDate(booking?.checkoutDate);
  return (
    <div className="h-auto flex items-center bg-gray-100 max-w flex-col p-10">
      <Head>
        <title>Edit</title>
      </Head>
      <div className="flex flex-col w-full">
        <form onSubmit={() => {}} className="w-full gap-4 flex flex-col">
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
              <div>
                {" "}
                {BookingService.priceFormatter().format(booking?.price)}
              </div>
            </InputWrapper>
            <InputWrapper label="Room description" error={""}>
              <div> {booking?.hotelRoom.description}</div>
            </InputWrapper>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-10 gap-4">
            <InputWrapper label="When will you go?" error={""}>
              <BookingDatePicker
                onHandleChange={() => {}}
                startDate={checkin}
                endDate={checkout}
              />
            </InputWrapper>

            <InputWrapper label="Guests" error={""}>
              <input
                type="text"
                className="form-input mt-1 block w-full rounded-md"
                placeholder="Guests"
                value={booking?.guests}
              />
            </InputWrapper>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4">
            <button
              type="submit"
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
