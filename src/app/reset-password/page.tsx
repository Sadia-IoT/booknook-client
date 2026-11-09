
"use client";

import { Suspense,useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function ResetPasswordform() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token: token || "",
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || "Password reset failed.");
      return;
    }

    setMessage("Password reset successful!");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Reset Password
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            minLength={6}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            minLength={6}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />

          {message && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {message}
            </p>
          )}

          {errorMessage && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/login" className="font-semibold text-green-700 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordform />
    </Suspense>
  );
}
