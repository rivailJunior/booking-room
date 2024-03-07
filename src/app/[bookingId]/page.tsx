import { EditForm } from "@/components";
import { getBookingById } from "@/service/edit-booking";

export default async function EditPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const booking = await getBookingById(Number(params.bookingId));
  console.log("booking ==>", booking);

  return <EditForm booking={booking} />;
}
