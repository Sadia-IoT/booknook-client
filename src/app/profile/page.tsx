"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    setIsLoading(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    setIsLoading(false);

    if (error) {
      setMessage(error.message || "Failed to update name.");
      return;
    }

    setMessage("Name updated successfully!");
    router.refresh();
  };

  return (
    <ProtectedRoute>
      <main className="mx-auto min-h-screen max-w-xl px-5 py-16">
        <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

        <p className="mb-2 text-gray-600">
          Email: {session?.user?.email}
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white"
          >
            {isLoading ? "Updating..." : "Update Name"}
          </button>
        </form>

        {message && <p className="mt-4">{message}</p>}
      </main>
    </ProtectedRoute>
  );
}