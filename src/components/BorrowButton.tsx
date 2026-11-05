
"use client";

import { useState } from "react";

type BorrowButtonProps = {
  availableCopies: number;
};

export default function BorrowButton({
  availableCopies,
}: BorrowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

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

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                className="rounded-lg bg-green-700 px-5 py-2 font-medium text-white hover:bg-green-800"
              >
                Confirm Borrow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
