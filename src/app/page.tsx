import { Heading } from "@/components";
import { HomePageContent } from "./home-page-content";

async function getRooms() {
  const response = await fetch("http://localhost:3000/api/hotel");
  return await response.json();
}

export default async function Home() {
  const hotelRooms = await getRooms();
  return (
    <>
      <Heading />
      <HomePageContent hotelRooms={hotelRooms.data} />
    </>
  );
}
