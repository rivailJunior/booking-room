import connection from "@/infra/data-base";

const getAllHotelRooms = async () => {
  return await connection.hotelRoom.findMany({
    include: {
      hotel: true,
      bookings: true,
    },
  });
};
export async function GET(req: Request) {
  const hotelRooms = await getAllHotelRooms();
  return Response.json({ data: hotelRooms });
}
