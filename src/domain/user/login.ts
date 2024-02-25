import { connection } from "@/infra/data-base";
import bcrypt from "bcryptjs";

export class Login {
  constructor() {}

  static async checkPassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static async findUser(email: string) {
    const user = await connection.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  static async doLogin(email: string, password: string) {
    const user = await this.findUser(email);
    if (user) {
      const isValidPassword = await this.checkPassword(
        password,
        user?.password
      );
      return isValidPassword;
    }
    return false;
  }
}
