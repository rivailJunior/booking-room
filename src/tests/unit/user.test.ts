//user
import { Email } from "@/domain/model/user/email.vo";
import { Login } from "@/domain/model/user/login";
import { UserDao } from "@/domain/model/user/user.dao";
import connection, { disconnect } from "@/infra/data-base";
import { describe, test, expect, vi } from "vitest";

afterEach(() => {
  (async () => {
    await disconnect();
  })();
});

const user = {
  name: "Jhon Doe",
  email: "jhondoe@gmail.com",
  password: "#Test123",
};

const resolvedValueCreate = {
  id: 1,
  name: "Jhon Doe",
  email: "jhondoe@gmail.com",
  password: "$2a$10$NLNXvyeimdOkiLWCXuMPu.h9Z7hyfeUhhbElDm8rzm3T7wQpe.rzu",
};

describe("User", () => {
  test("should return if email is valid or not", () => {
    const email = new Email(user.email);
    expect(email).toBeTruthy();
  });

  test("should throw error when email is not valid", async () => {
    expect(() => new Email("jhondoe.com")).toThrowError("Invalid E-mail");
  });

  test("should return an encrypted password", async () => {
    const userDao = new UserDao(user.name, user.email, user.password);
    expect(userDao.password).not.toBe("#Test123");
  });

  test.each([
    ["$2a$10$NLNXvyeimdOkiLWCXuMPu.h9Z7hyfeUhhbElDm8rzm3T7wQpe.rzu", true],
    ["$2a$10$Nrzusss", false],
  ])("should validate password: %s", async (hash, validation) => {
    const isValid = await Login.checkPassword(user.password, hash);
    expect(isValid).toBe(validation);
  });

  test("should create/upsert a user", async () => {
    const userDao = new UserDao(user.name, user.email, user.password);
    vi.spyOn(connection.user, "upsert").mockResolvedValue(resolvedValueCreate);
    const response = await userDao.create();
    expect(response).toBeTruthy();
    expect(response).toStrictEqual(resolvedValueCreate);
  });

  test("should do the user login", async () => {
    vi.spyOn(connection.user, "findUnique").mockResolvedValue(
      resolvedValueCreate
    );
    const userLogin = await Login.doLogin(user.email, user.password);
    expect(userLogin).toBeTruthy();
  });
});
