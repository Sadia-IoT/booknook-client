import Image from "next/image";
import BorrowButton from "@/components/BorrowButton";
import ProtectedPage from "@/components/ProtectedPage";

export const instant = false;
type Book = {
  _id: string;
  id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
  totalCopies: number;
  availableCopies: number;
};

async function getBook(id: string): Promise<Book | null> {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const response = await fetch(`${API_URL}/books/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.data;
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return <div className="p-10 text-center">Book not found.</div>;
  }

  return (
<ProtectedPage> 
<main className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
      <Image
        src={book.image}
        alt={book.title}
        width={640}
        height={800}
        unoptimized
        className="h-112.5 w-full rounded-xl object-cover"
      />

      <div>
        <p className="mb-3 text-sm font-medium text-green-700">
          {book.category}
        </p>

        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>

        <p className="mt-3 text-gray-600">By {book.author}</p>

        <p className="mt-6 leading-7 text-gray-700">{book.description}</p>

        <div className="mt-8 space-y-2">
          <p>Total Copies: {book.totalCopies}</p>
          <p>Available Copies: {book.availableCopies}</p>
          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900">Added By</h3>

            <p className="mt-2 text-sm text-gray-700">Name: {book.userName}</p>

            <p className="mt-1 text-sm text-gray-700">
              Email: {book.userEmail}
            </p>
          </div>
          {/* Borrow Button */}
          <BorrowButton bookId={book._id} availableCopies={book.availableCopies} />
        </div>
      </div>
    </main>
    </ProtectedPage>
  );
}
