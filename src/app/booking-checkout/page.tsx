import { getBookingCookie } from "./service/create-booking";
import CheckoutForm from "./checkout-form";
import { getLoginCookie } from "../login/service/login";
import { redirect } from "next/navigation";

export default async function BookingCheckoutCard() {
  const booking = await getBookingCookie();
  const user = await getLoginCookie();
  if (!user) {
    //TODO: show a modal to login
    redirect("/login");
  }

  return booking ? (
    <CheckoutForm booking={booking} />
  ) : (
    <div>Create this error page</div>
  );
}
