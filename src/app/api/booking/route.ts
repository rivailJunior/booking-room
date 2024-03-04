import { DateTime } from "@/domain/service/dateTime.ds";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const formData = await req.json();
  createBookingCookie(formData);
  return Response.json({});
}

const createBookingCookie = (formData: any) => {
  const cookieStore = cookies();
  const booking = {
    booking: formData.booking,
    roomDescription: formData.card.description,
    picture: formData.card.pictures,
    price: formData.totalPrice,
    hotel: formData.card.hotel.name,
    hotelId: formData.card.hotel.id,
    numberOfDays: DateTime.extractNumberOfDays(
      formData.booking.checkinDate,
      formData.booking.checkoutDate
    ),
  };

  cookieStore.set({
    name: "booking",
    value: JSON.stringify(booking),
    maxAge: 3600,
  });
};
