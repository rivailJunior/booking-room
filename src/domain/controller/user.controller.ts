import { Login } from "../model/user/login";

export class UserController {
  constructor() {}
  create() {}
  async login(email: string, password: string) {
    const isValidLogin = await Login.doLogin(email, password);
    if (isValidLogin) {
      return await Login.findUser(email);
    }
  }

  checkSession() {}
}
