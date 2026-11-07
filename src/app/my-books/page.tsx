import ProtectedRoute from "@/components/ProtectedRoute";

export default function MyBooksPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto min-h-screen max-w-7xl px-5 py-16">
        <h1 className="text-3xl font-bold text-[#174d38]">
          My Books
        </h1>

        <p className="mt-3 text-gray-600">
          Manage the books you have added to BookNook.
        </p>
      </main>
    </ProtectedRoute>
  );
}