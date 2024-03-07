"use server";

import { BookingController } from "@/domain/controller/booking.controller";
import { revalidatePath } from "next/cache";

export const deleteSubmitAction = async (state: any, formData: FormData) => {
  try {
    const bookingController = new BookingController();
    const id = formData.get("id");
    await bookingController.delete(parseInt(id as string));
    revalidatePath("/bookings");
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};
