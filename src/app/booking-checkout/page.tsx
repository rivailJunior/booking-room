import { getBookingCookie } from "./service/create-booking";
import CheckoutForm from "./checkout-form";

export default async function BookingCheckoutCard() {
  const booking = await getBookingCookie();

  return booking ? (
    <CheckoutForm booking={booking} />
  ) : (
    <div>Create this error page</div>
  );
}
