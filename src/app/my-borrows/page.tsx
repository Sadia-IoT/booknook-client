"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { getMyBorrows, returnBook } from "@/lib/api";
import { toast } from "react-hot-toast/headless";

type Borrow = {
  _id: string;
  bookId: string;
  title: string;
  image: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

export default function MyBorrowsPage() {
  const { data: session } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
const handleReturnBook = async (borrowId: string) => {
  try {
    await returnBook(borrowId);

    toast.success("Book returned successfully!");

    if (!session?.user?.email) return;

    const data = await getMyBorrows(session.user.email);
    setBorrows(data);
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to return book"
    );
  }
};

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBorrows = async () => {
      try {
        const data = await getMyBorrows(session.user.email);
        setBorrows(data);
      } catch (error) {
        console.error("Failed to fetch borrows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [session]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#faf9f6] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-[#174d38]">
            My Borrowed Books
          </h1>

          {loading ? (
            <p className="mt-8">Loading borrowed books...</p>
          ) : borrows.length === 0 ? (
            <p className="mt-8 text-gray-600">
              You haven&apos;t borrowed any books yet.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {borrows.map((borrow) => (
                <div
                  key={borrow._id}
                  className="rounded-xl border border-[#e8e6df] bg-white p-5 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900">
                    {borrow.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-600">
                    Borrow Date:{" "}
                    {new Date(borrow.borrowDate).toLocaleDateString("en-GB")}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Return Date:{" "}
                    {new Date(borrow.returnDate).toLocaleDateString("en-GB")}
                  </p>
               

                  <button
  onClick={() =>{
     console.log("Borrow ID:", borrow._id)
     console.log("Book ID:", borrow.bookId); 
    handleReturnBook(borrow._id);}}
  className="mt-4 w-full rounded-lg bg-[#174d38] px-4 py-3 font-semibold text-white transition hover:bg-[#103b2b]"
>
  Return Book
</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}