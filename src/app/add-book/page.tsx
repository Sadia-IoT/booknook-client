
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { BookOpen } from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { addBook } from "@/lib/api";

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    totalCopies: "5",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userEmail = session?.user?.email;

    if (!userEmail) {
      toast.error("Please login first");
      return;
    }

    if (Number(formData.totalCopies) < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    try {
      setLoading(true);

      await addBook({
        ...formData,
        totalCopies: Number(formData.totalCopies),
        userEmail,
      });

      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add book"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#faf9f6] px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-[#174d38] md:text-4xl">
              Add a New Book
            </h1>
            <p className="mt-3 text-gray-600">
              Add your favorite books to your library.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#047F39]" size={22} />
              <h2 className="text-xl font-bold text-[#174d38]">
                Book Information
              </h2>
            </div>

            {formData.image && (
              <img
                src={formData.image}
                alt="Book cover preview"
                className="h-48 w-32 rounded-lg object-cover shadow"
              />
            )}

            {[
              { name: "title", label: "Book Title", required: true },
              { name: "author", label: "Author", required: true },
              { name: "category", label: "Category", required: false },
              { name: "image", label: "Cover Image URL", required: false },
            ].map((field) => (
              <div key={field.name}>
                <label className="mb-2 block font-medium text-gray-700">
                  {field.label} {field.required && "*"}
                </label>

                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#047F39]"
                />
              </div>
            ))}

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#047F39]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Total Copies *
              </label>

              <input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                min="1"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#047F39]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#047F39] px-6 py-3 font-semibold text-white transition hover:bg-[#03652e] disabled:opacity-60"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
