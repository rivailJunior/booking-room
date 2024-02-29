import { GridCards, Form, Heading } from "@/components";

async function getRooms() {
  const response = await fetch("http://localhost:3000/api/hotel");
  return await response.json();
}

/**
 * TODO:
 * get bookings and pass it to the form
 * * it should be an array with dates (checkin and checkout dates) for each booking -
 * * it will allow or prevent the user to dates that are already booked
 */
export default async function Home() {
  const hotelRooms = await getRooms();
  return (
    <main className="flex min-h-screen container dark:bg-slate-900 flex-col">
      <Heading />
      <Form />
      <GridCards cards={hotelRooms.data} />
    </main>
  );
}
