import { getBookingCookie } from "./service/create-booking";
import CheckoutForm from "./checkout-form";
import { getLoginCookie } from "../login/service/login";

export default async function BookingCheckoutCard() {
  const booking = await getBookingCookie();
  const user = await getLoginCookie();

  return booking ? (
    <CheckoutForm booking={booking} user={user} />
  ) : (
    <div>Create this error page</div>
  );
}
