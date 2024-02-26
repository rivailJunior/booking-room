import connection, { disconnect } from "@/infra/data-base";
import { Prisma } from "@prisma/client";
import { describe, test, expect, vi } from "vitest";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

const resolvedValue = {
  id: 1,
  hotelId: 1,
  description: "A1",
  pictures: "/public/rooms/hotel-brazil",
  dayPrice: new Prisma.Decimal(100),
};
//rooms
describe("Rooms", () => {
  test("should read the first room of the hotel brazil", async () => {
    vi.spyOn(connection.hotelRoom, "findFirst").mockResolvedValueOnce(
      resolvedValue
    );
    const hotelRoom = await connection.hotelRoom.findFirst();
    expect(hotelRoom).toStrictEqual({
      id: 1,
      hotelId: 1,
      description: "A1",
      pictures: "/public/rooms/hotel-brazil",
      dayPrice: new Prisma.Decimal(100),
    });
  });
});
