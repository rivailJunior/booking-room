import connection, { disconnect } from "@/infra/data-base";
import { describe, test, expect, vi } from "vitest";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

//hotel
describe("Hotel", () => {
  test("should read one hotel", async () => {
    vi.spyOn(connection.hotel, "findFirst").mockResolvedValue({
      id: 1,
      name: "Hotel Brazil",
    });
    const hotel = await connection.hotel.findFirst();
    expect(hotel).toStrictEqual({
      id: 1,
      name: "Hotel Brazil",
    });
  });
});
