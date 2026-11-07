
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { borrowBook } from "@/lib/api";

type BorrowButtonProps = {
    bookId: string;
  availableCopies: number;
};

export default function BorrowButton({
  bookId,
  availableCopies,
}: BorrowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  console.log("Borrow Session:", session);

const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState("");
const borrowDate = new Date();
    const returnDate = new Date();

    returnDate.setDate(returnDate.getDate() + 7);

const handleConfirmBorrow = async () => {
  if (!session?.user?.email) {
    setMessage("Please login to borrow this book.");
    return;
  }

  try {
    setIsLoading(true);
    setMessage("");

    

    await borrowBook({
      bookId,
      userEmail: session.user.email,
      borrowDate: borrowDate.toISOString(),
      returnDate: returnDate.toISOString(),
    });

    setMessage("Book borrowed successfully!");
    setIsOpen(false);
    router.refresh();
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Failed to borrow book."
    );
  } finally {
    setIsLoading(false);
  }
};

  if (availableCopies <= 0) {
    return (
      <button
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-lg bg-gray-400 px-5 py-3 font-semibold text-white"
      >
        Not Available
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        Borrow This Book
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Confirm Borrow
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to borrow this book?
            </p>
            <div className="mt-5 space-y-3 rounded-lg bg-gray-50 p-4">
  <div>
    <label className="text-sm font-medium text-gray-600">
      Your Name
    </label>
    <p className="font-semibold text-gray-900">
      {session?.user?.name || "Loading..."}
    </p>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-600">
      Your Email
    </label>
    <p className="font-semibold text-gray-900">
      {session?.user?.email || "Loading..."}
    </p>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-600">
      Borrow Date
    </label>
    <p className="font-semibold text-gray-900">
      {borrowDate.toLocaleDateString("en-GB")}
    </p>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-600">
      Return Date
    </label>
    <p className="font-semibold text-gray-900">
      {returnDate.toLocaleDateString("en-GB")}
    </p>
  </div>
</div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              {message && (
  <p className="mt-3 text-sm text-center">
    {message}
  </p>
)}

              <button
                onClick={handleConfirmBorrow}
                disabled={isLoading}
                className="rounded-lg bg-green-700 px-5 py-2 font-medium text-white hover:bg-green-800"
              >
                 {isLoading ? "Processing..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
