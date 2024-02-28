import connection from "@/infra/data-base";

export async function GET() {
  const hotelRooms = await connection.hotelRoom.findMany({
    include: {
      hotel: true,
    },
  });
  return Response.json({ data: hotelRooms });
}
