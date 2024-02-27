import { describe, test, expect } from "vitest";
import connection, { disconnect } from "@/infra/data-base";
import dayjs from "dayjs";
import { DateTime } from "@/domain/model/booking/dateTime.vo";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

describe("DateTime", () => {
  test("should return true or false if date is between 2 others dates", () => {
    const isBetween = DateTime.isBetween(
      dayjs("2024-02-20").toDate(),
      dayjs("2024-02-25").toDate(),
      dayjs("2024-02-24").toDate()
    );
    expect(isBetween).toBe(true);
  });

  test("should throw error when pass wrong dates", () => {
    expect(() =>
      DateTime.isBetween(
        dayjs("2024-02-25").toDate(),
        dayjs("2024-02-20").toDate(),
        dayjs("2024-02-26").toDate()
      )
    ).toThrowError("The dates are not correct");
  });

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
    const totalDays = await DateTime.extractNumberOfDays(
      dayjs("2024-02-20").toDate(),
      dayjs("2024-02-25").toDate()
    );
    expect(totalDays).toBe(5);
  });

  test.each([
    ["2024-02-20", "2024-02-25", 500],
    ["2024-02-20", "2024-02-24", 400],
    ["2024-02-20", "2024-02-23", 300],
    ["2024-02-20", "2024-02-22", 200],
    ["2024-02-20", "2024-02-21", 100],
  ])(
    "should calculate amount according to 2 dates: %s",
    async (checkinDate, checkoutDate, amount) => {
      const totalDays = await DateTime.extractNumberOfDays(
        dayjs(checkinDate).toDate(),
        dayjs(checkoutDate).toDate()
      );
      const hotelRoom = await connection.hotelRoom.findFirst();
      const calc = (hotelRoom?.dayPrice as any) * totalDays;
      expect(calc).toBe(amount);
    }
  );

  test("should throw error when try to choose two dates wrongly", () => {
    expect(() =>
      DateTime.extractNumberOfDays(
        dayjs("2024-02-25").toDate(),
        dayjs("2024-02-20").toDate()
      )
    ).toThrowError("The dates are not correct");
  });
});
