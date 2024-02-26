import { BookingController } from "@/domain/controller/booking.controller";
import { BookingEntity } from "@/domain/entity/Booking.entity";
import dayjs from "dayjs";
import { describe, test, expect, vi } from "vitest";

const bookingCreateValues: BookingEntity = {
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
  updatedAt: null,
};
const bookingUpdatedValues: BookingEntity = {
  ...bookingCreateValues,
  updatedAt: dayjs().toDate(),
  guests: "Jose, Maria, Joao, Pedro",
};

vi.mock("../../domain/model/booking/booking", () => {
  return {
    BookingDao: vi.fn().mockImplementation(() => {
      return {
        findMyBooking: vi.fn().mockResolvedValue([bookingCreateValues]),
        create: vi.fn().mockResolvedValue(bookingCreateValues),
        delete: vi.fn().mockResolvedValue(bookingCreateValues),
        getLastBooking: vi.fn().mockResolvedValue(bookingCreateValues),
        update: vi.fn().mockResolvedValue(bookingUpdatedValues),
      };
    }),
  };
});

describe("Booking Controller", () => {
  test("should create a booking", async () => {
    const bookingController = new BookingController();

    const response = await bookingController.create({
      hotelId: 1,
      roomId: 1,
      userId: 1,
      guests: "Jones, Maria",
      checkinDate: dayjs("2024-05-05").toDate(),
      checkoutDate: dayjs("2024-05-10").toDate(),
    });
    expect(response).toBeTruthy();
    expect(response).toStrictEqual(bookingCreateValues);
  });

  test("should update a booking", async () => {
    const bookingController = new BookingController();
    const response = await bookingController.update(bookingUpdatedValues);
    expect(response).toBeTruthy();
    expect(response).toStrictEqual(bookingUpdatedValues);
  });

  test("should delete a booking", async () => {
    const bookingController = new BookingController();
    const response = await bookingController.delete(bookingCreateValues.id);
    expect(response).toBeTruthy();
    expect(response).toStrictEqual(bookingCreateValues);
  });

  test("should read my bookings", async () => {
    const bookingController = new BookingController();
    const response = await bookingController.getAll(1);
    expect(response).toBeTruthy();
    expect(response).toStrictEqual([bookingCreateValues]);
  });

  test("should get last booking", async () => {
    const bookingController = new BookingController();
    const response = await bookingController.getLast(1);
    expect(response).toBeTruthy();
    expect(response).toStrictEqual(bookingCreateValues);
  });
});
