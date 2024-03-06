import { redirect } from "next/navigation";
import { getLoginCookie, handleDoLogin } from "./service/login";

export default async function LoginPage() {
  const user = await getLoginCookie();
  if (user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col w-full max-w-sm mx-auto bg-gray-50 rounded-lg shadow-md dark:bg-gray-700 ">
      <form className="flex flex-col p-8" action={handleDoLogin}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-700 dark:text-gray-400"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="your@email.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-700 dark:text-gray-400"
          >
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="******************"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
