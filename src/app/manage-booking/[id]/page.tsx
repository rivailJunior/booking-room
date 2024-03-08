import { EditForm } from "@/components";
import { getBookingById } from "@/service/edit-booking";

export default async function EditPage({ params }: { params: { id: string } }) {
  const booking = await getBookingById(Number(params.id));

  return <EditForm booking={booking} />;
}
