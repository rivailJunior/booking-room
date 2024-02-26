import { describe, test, expect } from "vitest";
import { connection, disconnect } from "@/infra/data-base";
import { BookingDao } from "@/domain/booking/booking";
import dayjs from "dayjs";
import { DateTime } from "@/domain/booking/dateTime.vo";
// import { mockDeep } from "vitest-mock-extended";
// import { PrismaClient } from "@prisma/client";
const bookingDao = new BookingDao(DateTime);

// const prismaMock = mockDeep<PrismaClient>();

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

//booking
describe("Booking", () => {
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

  test("should throw error when try to choose two dates wrongly", async () => {
    await expect(
      DateTime.extractNumberOfDays(
        dayjs("2024-02-25").toDate(),
        dayjs("2024-02-20").toDate()
      )
    ).rejects.toThrow("The dates are not correct");
  });

  test("should create a booking", async () => {
    const response = await bookingDao.create({
      hotelId: 1,
      roomId: 1,
      userId: 1,
      guests: "Jones, Martha, Maria, Jose",
      checkinDate: dayjs("2024-05-05").toDate(),
      checkoutDate: dayjs("2024-05-10").toDate(),
    });
    expect(response).toBeTruthy();
  });

  test("should read first booking ", async () => {
    const booking = await bookingDao.getLastBooking(1);
    expect(booking).toMatchObject({
      guests: "Jones, Martha, Maria, Jose",
      hasCheckingStarted: false,
      hasCheckoutComplete: false,
      hotelId: 1,
      roomId: 1,
      updatedAt: null,
      userId: 1,
    });
  });

  test("should be update my booking", async () => {
    const myLastBooking = await bookingDao.getLastBooking(1);
    const id = myLastBooking.id;
    myLastBooking.guests = "Jose, Maria";
    const response = await bookingDao.update(myLastBooking, id);
    expect(response).toBeTruthy();
    const updatedBooking = await bookingDao.getLastBooking(1);
    expect(updatedBooking.updatedAt).not.toBeNull();
  });

  test("should be possible to delete my booking", async () => {
    const myLastBooking = await bookingDao.getLastBooking(1);
    const response = await bookingDao.delete(myLastBooking.id);
    expect(response).toBeTruthy();
  });

  test("should throw an error when pass invalid dates to create booking", async () => {
    const bookingData = {
      hotelId: 1,
      roomId: 1,
      userId: 1,
      guests: "Jones, Martha, Maria, Jose",
      checkinDate: dayjs("2024-05-10").toDate(),
      checkoutDate: dayjs("2024-05-05").toDate(),
    };
    await expect(() => bookingDao.create(bookingData)).rejects.toThrowError(
      "The dates are not correct"
    );
  });
});
