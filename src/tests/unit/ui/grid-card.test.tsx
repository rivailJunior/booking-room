import { GridCards } from "@/components/";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
const cards: Omit<HotelRoomEntity, "id">[] = [
  {
    dayPrice: 100,
    description: "Room 1",
    hotelId: 1,
    hotel: { name: "Hotel 1", id: 1 },
    pictures: "picture1.jpg",
  },
  {
    dayPrice: 200,
    description: "Room 2",
    hotelId: 1,
    hotel: { name: "Hotel 2", id: 1 },
    pictures: "picture2.jpg",
  },
];
describe("GridCards", () => {
  it("renders cards with their details", () => {
    const { getAllByText, getAllByRole } = render(
      <GridCards cards={cards as any} handleCardClick={() => {}} />
    );

    expect(getAllByText("Room 1")).toHaveLength(1);
    expect(getAllByText("$ 100")).toHaveLength(1);
    expect(getAllByText("Hotel 1")).toHaveLength(1);

    expect(getAllByText("Room 2")).toHaveLength(1);
    expect(getAllByText("$ 200")).toHaveLength(1);
    expect(getAllByText("Hotel 2")).toHaveLength(1);

    const images = getAllByRole("img");

    expect(images).toHaveLength(2);
    expect(images[0].getAttribute("src")).toContain("picture1.jpg");
    expect(images[1].getAttribute("src")).toContain("picture2.jpg");
  });
});
