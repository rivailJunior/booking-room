import { connection } from "@/infra/data-base";
import bcrypt from "bcryptjs";
import { Email } from "./email.vo";

export class UserDao {
  email: string;
  password: string;
  constructor(readonly name: string, email: string, passwordValue: string) {
    this.email = new Email(email).email;
    this.password = this.generatePassword(passwordValue);
  }

  generatePassword(value: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }

  async create() {
    return await connection.user.upsert({
      where: {
        id: 1,
      },
      create: {
        name: this.name,
        email: this.email,
        password: this.password,
      },
      update: {},
    });
  }
}
