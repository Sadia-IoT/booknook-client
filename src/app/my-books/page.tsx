"use client";

import { useEffect, useState, type FormEvent } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { deleteBook, getMyBooks, updateBook } from "@/lib/api";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, X, BookOpen } from "lucide-react";

type Book = {
  _id: string;
  title: string;
  author: string;
  category?: string;
  description?: string;
  image?: string;
  totalCopies: number;
  availableCopies: number;
};

export default function MyBooksPage() {
  const { data: session } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    totalCopies: "",
  });

  const fetchMyBooks = async () => {
    const email = session?.user?.email;

    if (!email) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMyBooks(email);
      setBooks(data);
    } catch {
      toast.error("Failed to load your books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = session?.user?.email;

    if (!email) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    let cancelled = false;

    getMyBooks(email)
      .then((data) => {
        if (!cancelled) setBooks(data);
      })
      .catch(() => {
        if (!cancelled) toast.error("Failed to load your books");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [session?.user?.email]);

  const handleEdit = (book: Book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category || "",
      description: book.description || "",
      image: book.image || "",
      totalCopies: String(book.totalCopies),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingBook) return;

    if (Number(formData.totalCopies) < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    if (Number(formData.totalCopies) < editingBook.totalCopies - editingBook.availableCopies) {
      toast.error("Total copies cannot be less than borrowed copies");
      return;
    }

    try {
      setSaving(true);

      await updateBook(editingBook._id, {
        ...formData,
        totalCopies: Number(formData.totalCopies),
      });

      toast.success("Book updated successfully!");
      setEditingBook(null);
      await fetchMyBooks();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update book"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await deleteBook(id);
      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== id)
      );
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete book"
      );
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#faf9f6] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#174d38] md:text-4xl">
              My Books
            </h1>
            <p className="mt-3 text-gray-600">
              Manage the books you have added to BookNook.
            </p>
          </div>

          {loading ? (
            <p className="py-16 text-center text-gray-500">
              Loading your books...
            </p>
          ) : books.length === 0 ? (
            <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
              <BookOpen className="mx-auto mb-4 text-[#174d38]" size={45} />
              <h2 className="text-xl font-semibold text-gray-800">
                No books added yet
              </h2>
              <p className="mt-2 text-gray-500">
                Start adding books to your personal library.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-[#e9f0eb]">
                      <BookOpen size={55} className="text-[#174d38]" />
                    </div>
                  )}

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-900">
                      {book.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      By {book.author}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Category: {book.category || "Not specified"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Available: {book.availableCopies} / {book.totalCopies}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => handleEdit(book)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#174d38] px-4 py-2.5 font-medium text-white transition hover:bg-[#103b2a]"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {editingBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#174d38]">
                  Edit Book
                </h2>

                <button
                  onClick={() => setEditingBook(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                {[
                  { name: "title", label: "Book Title" },
                  { name: "author", label: "Author" },
                  { name: "category", label: "Category" },
                  { name: "image", label: "Cover Image URL" },
                  { name: "totalCopies", label: "Total Copies" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-1 block font-medium text-gray-700">
                      {field.label}
                    </label>

                    <input
                      type={field.name === "totalCopies" ? "number" : "text"}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      min={field.name === "totalCopies" ? "1" : undefined}
                      required={
                        field.name === "title" ||
                        field.name === "author" ||
                        field.name === "totalCopies"
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#174d38]"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-1 block font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#174d38]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-lg bg-[#174d38] px-5 py-3 font-semibold text-white hover:bg-[#103b2a] disabled:opacity-60"
                >
                  {saving ? "Updating..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}