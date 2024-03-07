import { CheckoutForm } from "@/components";
import { getBookingCookie } from "../../service/create-booking";
import { getLoginCookie } from "../../service/login";

export default async function BookingCheckoutCard() {
  const booking = await getBookingCookie();
  const user = await getLoginCookie();

  return booking ? (
    <CheckoutForm booking={booking} user={user} />
  ) : (
    <div>Create this error page</div>
  );
}
