import { connection, disconnect } from "@/infra/data-base";
import { describe, test, expect } from "vitest";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

//hotel
describe("Hotel", () => {
  test("should read one hotel", async () => {
    const hotel = await connection.hotel.findFirst();
    expect(hotel).toStrictEqual({
      id: 1,
      name: "Hotel Brazil",
    });
  });
});
