import { connection, disconnect } from "@/infra/data-base";
import { describe, test, expect } from "vitest";
import dayjs from "dayjs";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

async function extractNumberOfDays(startDay: string, endDay: string) {
  const startDate = dayjs(startDay);
  const endDate = dayjs(endDay);
  const totalDays = endDate.diff(startDate, "day");
  if (totalDays < 0) {
    throw new Error("The dates are not correct");
  }
  return totalDays;
}

//booking
describe("Booking", () => {
  test("should return read first booking returning null", async () => {
    const booking = await connection.booking.findFirst();
    expect(booking).toBe(null);
  });
  //calculate the amount according to the days
  test.each([
    [2, 200],
    [3, 300],
    [4, 400],
    [5, 500],
  ])(
    "should calculate the amount according to number of days: %s",
    async (days, values) => {
      const hotelRoom = await connection.hotelRoom.findFirst();
      const calc = (hotelRoom?.dayPrice as any) * days;
      expect(calc).toBe(values);
    }
  );

  test("should extract the number of days between 2 dates", async () => {
    const totalDays = await extractNumberOfDays("2024-02-20", "2024-02-25");
    expect(totalDays).toBe(5);
  });

  test.each([
    ["2024-02-20", "2024-02-25", 500],
    ["2024-02-20", "2024-02-24", 400],
    ["2024-02-20", "2024-02-23", 300],
    ["2024-02-20", "2024-02-22", 200],
    ["2024-02-20", "2024-02-21", 100],
  ])(
    "should calculate amount according to 2 dates: %d",
    async (checkinDate, checkoutDate, amount) => {
      const totalDays = await extractNumberOfDays(checkinDate, checkoutDate);
      const hotelRoom = await connection.hotelRoom.findFirst();
      const calc = (hotelRoom?.dayPrice as any) * totalDays;
      expect(calc).toBe(amount);
    }
  );

  test("should throw error when try to choose two dates wrongly", async () => {
    await expect(
      extractNumberOfDays("2024-02-25", "2024-02-20")
    ).rejects.toThrow("The dates are not correct");
  });
});
