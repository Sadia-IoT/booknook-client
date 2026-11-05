"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setIsLoading(true);
  setErrorMessage("");

  const { error } = await authClient.signIn.email({
    email,
    password,
  });

  setIsLoading(false);

  if (error) {
    setErrorMessage(error.message || "Login failed.");
    return;
  }

  router.push("/");
  router.refresh();
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Login to continue exploring BookNook.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>
          {errorMessage && (
  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
    {errorMessage}
  </p>
)}

         <button
  type="submit"
  disabled={isLoading}
  className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
>
  {isLoading ? "Logging in..." : "Login"}
</button>
        </form>
      </div>
    </div>
  );
}