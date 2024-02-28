import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const generateRoomsObj = (path: string, description: string) => {
  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  return Array.from({ length: 4 }).map((_, index) => {
    return {
      description: `${description}-${index + 1}`,
      pictures: `${path}/${path}-${index + 1}.jpg`,
      dayPrice: Math.ceil(getRandomArbitrary(100, 500)),
    };
  });
};

async function main() {
  // await prisma.hotelRoom.deleteMany();
  // await prisma.hotel.deleteMany();
  const hotelBrazil = generateRoomsObj(
    "hotel-brazil",
    "This is the room of Hotel Brazil"
  );
  const hotelArgentina = generateRoomsObj(
    "hotel-argentina",
    "This is the room of Hotel Argentina"
  );
  const hotelFrance = generateRoomsObj(
    "hotel-france",
    "This is the room of Hotel France"
  );
  const hotel1 = await prisma.hotel.upsert({
    where: { id: 100 },
    update: {},
    create: {
      name: "Hotel Brazil",
      hotelRooms: {
        create: [...hotelBrazil],
      },
    },
  });
  const hotel2 = await prisma.hotel.upsert({
    where: { id: 200 },
    update: {},
    create: {
      name: "Hotel France",
      hotelRooms: {
        create: [...hotelFrance],
      },
    },
  });
  const hotel3 = await prisma.hotel.upsert({
    where: { id: 300 },
    update: {},
    create: {
      name: "Hotel Argentina",
      hotelRooms: {
        create: [...hotelArgentina],
      },
    },
  });
  console.log({ hotel1, hotel2, hotel3 });
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
