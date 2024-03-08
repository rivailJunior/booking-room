import { permanentRedirect } from "next/navigation";
import { getLoginCookie } from "../../service/login";
import { LoginForm } from "@/components";

export default async function LoginPage() {
  const user = await getLoginCookie();
  if (user) {
    permanentRedirect("/");
  }
  return (
    <div className="flex flex-col w-full max-w-sm mx-auto bg-gray-50 rounded-lg shadow-md dark:bg-gray-700 ">
      <LoginForm />
    </div>
  );
}
