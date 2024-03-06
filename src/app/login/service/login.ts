"use server";

import { UserController } from "@/domain/controller/user.controller";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const userController = new UserController();

const setUserCookie = (user: any) => {
  if (user) {
    cookies().set("user", JSON.stringify(user), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
};

export const getLoginCookie = () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("user");
  if (cookie) {
    return JSON.parse(cookie.value);
  }
  return null;
};

export const handleDoLogin = async (formData: FormData) => {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");
  const user = await userController.login(email as string, password as string);
  if (user) {
    setUserCookie(user);
    redirect("/");
  }
};
