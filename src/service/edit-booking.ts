"use server";
import { BookingController } from "@/domain/controller/booking.controller";
import { BookingEntity } from "@/domain/entity/Booking.entity";
import { DateTime } from "@/domain/service/dateTime.ds";
import { revalidatePath } from "next/cache";

export async function getBookingById(bookingId: number) {
  const bookingController = new BookingController();
  return await bookingController.getById(bookingId);
}

export async function updateBookingAction(state: any, formData: FormData) {
  try {
    const bookingController = new BookingController();
    const guests = formData.get("guests");
    const price = formData.get("price");
    const id = formData.get("id");
    const checkinDate = formData.get("checkinDate");
    const checkoutDate = formData.get("checkoutDate");

    const booking: Partial<BookingEntity> = {
      id: Number(id),
      guests: guests?.toString(),
      checkinDate: DateTime.formatDate(checkinDate as string),
      checkoutDate: DateTime.formatDate(checkoutDate as string),
      price: price?.toString() as any,
    };

    await bookingController.update(booking);
    revalidatePath("/edit/" + id);
    return { success: true, error: null };
  } catch (err) {
    return { error: true, success: null };
  }
}
