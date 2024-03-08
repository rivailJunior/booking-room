import { CheckoutForm } from "@/components";
import { getBookingCookie } from "../../service/create-booking";
import { getLoginCookie } from "../../service/login";

export default async function BookingCheckoutCard() {
  const booking = await getBookingCookie();
  const user = await getLoginCookie();

  return booking ? (
    <CheckoutForm booking={booking} user={user} />
  ) : (
    <div className="w-full flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl">First you need to:</h1>
      <p>Select a place</p>
      <p>Select the dates: Check-in and Check-out</p>
      <p>Select the room</p>
    </div>
  );
}
