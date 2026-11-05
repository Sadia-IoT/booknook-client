"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";

type Book = {
  _id: string;
  title: string;
  author: string;
  availableCopies: number;
  image: string;
};

export default function BooksSection() {
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
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Featured Books
      </h2>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              title={book.title}
              author={book.author}
              availableCopies={book.availableCopies}
              image={book.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}