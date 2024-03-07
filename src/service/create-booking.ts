"use server";

import { getLoginCookie } from "@/service/login";
import { BookingController } from "@/domain/controller/booking.controller";
import { BookingProps } from "@/domain/entity/Booking.entity";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getBookingCookie = () => {
  const cookieStore = cookies();
  const booking = cookieStore.get("booking");
  if (booking?.value.length) {
    return JSON.parse(booking?.value as string);
  }
  return null;
};

export const deleteBookingCookie = (redirectPath: string = "/") => {
  const cookieStore = cookies();
  cookieStore.delete("booking");
  redirect(redirectPath);
};

const cancelAction = async () => {
  await deleteBookingCookie();
  redirect("/");
};

const createAction = async (booking: any, formData: FormData) => {
  try {
    const user = getLoginCookie();
    const guest = formData.get("guests");
    const price = booking.price;

    const bookingData: BookingProps = {
      guests: `${user.name}, ${guest}`,
      hotelId: booking.hotelId,
      roomId: booking.booking.roomId,
      userId: user.id,
      checkinDate: booking.booking.checkinDate,
      checkoutDate: booking.booking.checkoutDate,
      price,
    };
    const bookingController = new BookingController();
    await bookingController.create(bookingData);
    revalidatePath("/bookings");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: true,
    };
  }
};

export const formSubmitAction = async (booking: any, formData: FormData) => {
  const action = formData.get("button");
  if (action === "cancel") {
    await cancelAction();
  } else {
    return await createAction(booking, formData);
  }
};
