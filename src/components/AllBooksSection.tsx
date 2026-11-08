"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  availableCopies: number;
  image: string;
};

export default function AllBooksSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          All Books
        </h1>
        <p className="mt-3 text-gray-600">
          Explore our complete book collection.
        </p>
      </div>

      {loading ? (
        <p className="py-10 text-center">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="py-10 text-center">No books available.</p>
      ) : (
        <>
          <p className="mb-6 text-sm text-gray-600">
            Total Books: {books.length}
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                id={book._id}
                title={book.title}
                author={book.author}
                category={book.category}
                availableCopies={book.availableCopies}
                image={book.image}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}