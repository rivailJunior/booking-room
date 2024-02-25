import { describe, test, expect } from "vitest";
import { connection, disconnect } from "@/infra/data-base";
import { BookingDao } from "@/domain/booking/booking";
import dayjs from "dayjs";
const bookingDao = new BookingDao();

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
    const totalDays = await bookingDao.extractNumberOfDays(
      "2024-02-20",
      "2024-02-25"
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
      const totalDays = await bookingDao.extractNumberOfDays(
        checkinDate,
        checkoutDate
      );
      const hotelRoom = await connection.hotelRoom.findFirst();
      const calc = (hotelRoom?.dayPrice as any) * totalDays;
      expect(calc).toBe(amount);
    }
  );

  test("should throw error when try to choose two dates wrongly", async () => {
    await expect(
      bookingDao.extractNumberOfDays("2024-02-25", "2024-02-20")
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
    const booking = await bookingDao.findMyBooking(1);
    expect(booking[0]).toMatchObject({
      guests: "Jones, Martha, Maria, Jose",
      hasCheckingStarted: false,
      hasCheckoutComplete: false,
      hotelId: 1,
      roomId: 1,
      updatedAt: null,
      userId: 1,
    });
  });

  //TODO: fix this one
  // test("should be update my booking", async () => {
  //   const myLastBooking = await bookingDao.findMyBooking(1);
  //   myLastBooking[0].guests = "Jose, Maria";

  //   const response = await bookingDao.update(myLastBooking[0], 23);
  //   expect(response).toBeTruthy();
  //   const afterUpdate = await bookingDao.findMyBooking(1);
  //   console.log("updated ===>", afterUpdate);
  // });

  test("should be possible to delete my booking", async () => {
    const myLastBooking = await bookingDao.findMyBooking(1);
    const response = await bookingDao.delete(myLastBooking[0].id);
    expect(response).toBeTruthy();
  });
});
