import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddBookPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <h1 className="text-3xl font-bold text-[#174d38]">
          Add a New Book
        </h1>

        <p className="mt-3 text-gray-600">
          Add your favorite book to the BookNook library.
        </p>
      </main>
    </ProtectedRoute>
  );
}