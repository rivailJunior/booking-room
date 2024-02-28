import { Heading } from "@/components";
import GridCards from "@/components/grid-cards";

async function getRooms() {
  const response = await fetch("http://localhost:3000/api/hotel");
  return await response.json();
}

export default async function Home() {
  const hotelRooms = await getRooms();
  return (
    <main className="flex min-h-screen container dark:bg-slate-900 flex-col">
      <Heading />
      <GridCards cards={hotelRooms.data} />
    </main>
  );
}
