
"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import { Search } from "lucide-react";

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

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Get unique categories
  const categories = [
    "All",
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  // Search and category filtering
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 font-semibold uppercase tracking-widest text-green-700">
          Explore Our Collection
        </p>

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
          {/* Search and Category Filter */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by book title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-green-600"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Total Books */}
          <p className="mb-6 text-sm text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </p>

          {/* Books Grid */}
          {filteredBooks.length === 0 ? (
            <div className="rounded-xl bg-white py-16 text-center">
              <Search size={40} className="mx-auto mb-3 text-gray-300" />

              <h3 className="text-xl font-semibold text-gray-800">
                No Books Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
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
          )}
        </>
      )}
    </section>
  );
}
