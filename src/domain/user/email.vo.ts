import { z } from "zod";

export class Email {
  constructor(readonly email: string) {
    Email.validateEmail(email);
  }

  static validateEmail(value: string) {
    try {
      const emailField = z.string().email();
      emailField.parse(value);
      return value;
    } catch (err) {
      throw new Error("Invalid E-mail");
    }
  }
}
