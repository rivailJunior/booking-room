import { connection, disconnect } from "@/infra/data-base";
import { Prisma } from "@prisma/client";
import { describe, test, expect } from "vitest";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";

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

async function generatePassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function checkPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

async function createNewUser(data: IUser) {
  return await connection.user.upsert({
    where: {
      id: data.id,
    },
    create: data,
    update: {},
  });
}

async function doLogin(email: string, password: string) {
  const user = await connection.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const isValidPassword = await checkPassword(password, user?.password);
    return isValidPassword;
  }
  return false;
}

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

//rooms
describe("Rooms", () => {
  test("should read the first room of the hotel brazil", async () => {
    const hotelRoom = await connection.hotelRoom.findFirst();
    expect(hotelRoom).toStrictEqual({
      id: 1,
      hotelId: 1,
      description: "A1",
      pictures: "/public/rooms/hotel-brazil",
      dayPrice: new Prisma.Decimal(hotelRoom?.dayPrice || 0),
    });
  });
});

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

//user
describe("User", () => {
  test("should return an encrypted password", async () => {
    const password = await generatePassword("#Test123");
    console.log("password", password);
    expect(password).not.toBe("#Test123");
  });

  test.each([
    ["$2a$10$NLNXvyeimdOkiLWCXuMPu.h9Z7hyfeUhhbElDm8rzm3T7wQpe.rzu", true],
    ["$2a$10$Nrzusss", false],
  ])("should validate password: %s", async (hash, validation) => {
    const isValid = await checkPassword("#Test123", hash);
    expect(isValid).toBe(validation);
  });

  test("should create/upsert a user", async () => {
    const pwd = await generatePassword("#Test123");
    const user = {
      id: 1,
      name: "Jhon Doe Santos",
      email: "jhondoe@gmail.com",
      password: pwd,
    };
    const response = await createNewUser(user);
    expect(response).toBeTruthy();
    expect(response).toStrictEqual({
      id: 1,
      email: "jhondoe@gmail.com",
      name: "Jhon Doe",
      password: "$2a$10$JHHgC7iaccKsEf7NLDVuie8wcC9iaEvKtL9p6s1b0QeP9kTMNUnAO",
    });
  });

  test("should do the user login", async () => {
    const userLogin = await doLogin("jhondoe@gmail.com", "#Test123");
    expect(userLogin).toBeTruthy();
  });
});
