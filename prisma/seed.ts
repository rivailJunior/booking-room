import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const hotel = await prisma.hotel.create({
    data: {
      name: "Hotel Brazil",
      hotelRooms: {
        create: {
          description: "A1",
          pictures: "/public/rooms/hotel-brazil",
          dayPrice: 100,
        },
      },
    },
  });

  console.log({ hotel });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
