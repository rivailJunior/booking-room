//user
import { connection, disconnect } from "@/infra/data-base";
import { describe, test, expect } from "vitest";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

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
    // expect(response).toEqual({
    //   id: 1,
    //   email: "jhondoe@gmail.com",
    //   name: "Jhon Doe",
    //   password: "$2a$10$JHHgC7iaccKsEf7NLDVuie8wcC9iaEvKtL9p6s1b0QeP9kTMNUnAO",
    // });
  });

  test("should do the user login", async () => {
    const userLogin = await doLogin("jhondoe@gmail.com", "#Test123");
    expect(userLogin).toBeTruthy();
  });
});
