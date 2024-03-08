import { EditForm } from "@/components";
import { getBookingById } from "@/service/edit-booking";
import { getLoginCookie } from "@/service/login";
import { redirect } from "next/navigation";

export default async function MageBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getLoginCookie();
  if (!user) {
    redirect("/");
  }
  const booking = await getBookingById(Number(params.id));

  return <EditForm booking={booking} />;
}
