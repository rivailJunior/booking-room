import { HotelRoomService } from "@/domain/service/hotel-rooms.ds";
import { Prisma } from "@prisma/client";
import { test, expect } from "vitest";

describe("HotelRoomService", () => {
  test("filterByPlace", () => {
    const hotelRooms = [
      {
        id: 1,
        hotelId: 1,
        description: "A1",
        pictures: "/public/rooms/hotel-brazil",
        dayPrice: new Prisma.Decimal(100),
        hotel: {
          id: 1,
          name: "Hotel Brazil",
        },
      },
      {
        id: 2,
        hotelId: 1,
        description: "A1",
        pictures: "/public/rooms/hotel-france",
        dayPrice: new Prisma.Decimal(100),
        hotel: {
          id: 2,
          name: "Hotel France",
        },
      },
      {
        id: 3,
        hotelId: 1,
        description: "A1",
        pictures: "/public/rooms/hotel-argentina",
        dayPrice: new Prisma.Decimal(100),
        hotel: {
          id: 3,
          name: "Hotel Argentina",
        },
      },
    ];

    const filteredRooms = HotelRoomService.filterByPlace(
      hotelRooms as any,
      "brazil"
    );
    expect(filteredRooms).toStrictEqual([
      {
        id: 1,
        hotelId: 1,
        description: "A1",
        pictures: "/public/rooms/hotel-brazil",
        dayPrice: new Prisma.Decimal(100),
        hotel: {
          id: 1,
          name: "Hotel Brazil",
        },
      },
    ]);
  });
});
