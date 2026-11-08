"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import { getLatestBooks } from "@/lib/api";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  availableCopies: number;
  image: string;
};

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getLatestBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch latest books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 font-semibold uppercase tracking-widest text-green-700">
          Explore Our Collection
        </p>

        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          New Arrivals
        </h2>

        <p className="mt-3 text-gray-600">
          Discover the latest books added to our library.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="py-10 text-center text-gray-500">
          Loading latest books...
        </p>
      ) : books.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No books available yet.
        </p>
      ) : (
        <>
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

          {/* See All Books */}
          <div className="mt-12 text-center">
            <Link
              href="/books"
              className="inline-block rounded-lg border-2 border-green-700 px-8 py-3 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              See All Books
            </Link>
          </div>
        </>
      )}
    </section>
  );
}