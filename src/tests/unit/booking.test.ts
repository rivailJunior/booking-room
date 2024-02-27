import { describe, test, expect, vi } from "vitest";
import connection, { disconnect } from "@/infra/data-base";
import { BookingDao } from "@/domain/model/booking/booking.dao";
import dayjs from "dayjs";
const bookingDao = new BookingDao();

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

const resolvedValueUpdate = {
  id: 10,
  guests: "Jones, Maria",
  hasCheckingStarted: false,
  hasCheckoutComplete: false,
  hotelId: 1,
  roomId: 1,
  userId: 1,
  checkinDate: dayjs().toDate(),
  checkoutDate: dayjs().toDate(),
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
};

const resolvedValueCreate = {
  ...resolvedValueUpdate,
  updatedAt: null,
};

//booking
describe("Booking", () => {
  test("should create a booking", async () => {
    vi.spyOn(connection.booking, "create").mockResolvedValue(
      resolvedValueCreate
    );
    const response = await bookingDao.create({
      hotelId: 1,
      roomId: 1,
      userId: 1,
      guests: "Jones, Maria",
      checkinDate: dayjs("2024-05-05").toDate(),
      checkoutDate: dayjs("2024-05-10").toDate(),
    });
    expect(response).toBeTruthy();
    expect(response).toStrictEqual(resolvedValueCreate);
  });

  test("should read first booking ", async () => {
    vi.spyOn(connection.booking, "findMany").mockResolvedValue([
      resolvedValueCreate,
    ]);
    const booking = await bookingDao.getLastBooking(1);
    expect(booking).toMatchObject(resolvedValueCreate);
  });

  test("should be update my booking", async () => {
    const myLastBooking = await bookingDao.getLastBooking(1);
    const id = myLastBooking.id;
    myLastBooking.guests = "Jose, Maria";

    vi.spyOn(connection.booking, "update").mockResolvedValue(
      resolvedValueUpdate
    );
    const response = await bookingDao.update(myLastBooking, id);
    expect(response).toBeTruthy();
    vi.spyOn(connection.booking, "findMany").mockResolvedValue([
      resolvedValueUpdate,
    ]);
    const updatedBooking = await bookingDao.getLastBooking(1);
    expect(updatedBooking.updatedAt).not.toBeNull();
  });

  test("should be possible to delete my booking", async () => {
    const myLastBooking = await bookingDao.getLastBooking(1);
    vi.spyOn(connection.booking, "delete").mockResolvedValue(
      resolvedValueCreate
    );
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

  test("should return the room booking", async () => {
    vi.spyOn(connection.booking, "findMany").mockResolvedValue([
      resolvedValueUpdate,
    ]);
    const roomBooking = await bookingDao.findRoomBooking(1, 1);
    expect(roomBooking).toBeTruthy();
    expect(roomBooking.length).toBe(1);
    expect(roomBooking[0]).toStrictEqual(resolvedValueUpdate);
  });
});
