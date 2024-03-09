"use client";
import { BookingService } from "@/domain/service/booking.ds";
import { DateTime } from "@/domain/service/dateTime.ds";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { formSubmitAction } from "../service/create-booking";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CheckoutForm({ booking, user }: { booking: any; user: any }) {
  const [state, formAction] = useFormState(formSubmitAction, booking);

  useEffect(() => {
    if (state?.success) {
      toast("Booking created successfully", {
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
    <form action={formAction}>
      <ToastContainer />
      {!user?.name && (
        <div className="text-red-500 p-5 w-full justify-center items-center flex">
          Please, do login to continue!
        </div>
      )}

      <div className="flex flex-col gap-4 w-full md:w-3/4 mx-auto">
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row ">
            <div className="w-full alig flex flex-col gap-2">
              <h1 className="text-3xl font-normal text-blue-500">
                Your Booking
              </h1>
            </div>
            <span className="text-xl font-normal md:items-end flex flex-col text-gray-500">
              Total{" "}
              <p className="font-normal text-black">
                {BookingService.priceFormatter().format(booking.price)}
              </p>
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
                id="guests"
                type="text"
                name="guests"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 dark:bg-gray-800 dark:text-white capitalize"
                placeholder="Jhon, Maria, Sarah, etc."
              />
            </div>
            <div className="flex flex-row gap-2 justify-end">
              <button
                type="submit"
                value="cancel"
                name="button"
                className={
                  "px-8 py-3 bg-red-500 text-white rounded shadow " +
                  (state.success ? "bg-blue-400" : "bg-red-500")
                }
              >
                {state?.success ? "Home" : "Cancel"}
              </button>
              {state?.success && (
                <Link
                  href="/bookings"
                  className="px-8 py-3 bg-green-400 text-white rounded shadow"
                >
                  My Bookings
                </Link>
              )}
              <button
                disabled={!user?.name || state?.success}
                name="button"
                value="confirm"
                type="submit"
                className={
                  "px-8 py-3  text-white rounded shadow " +
                  (!user?.name || state?.success
                    ? "bg-blue-100"
                    : "bg-blue-500")
                }
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
