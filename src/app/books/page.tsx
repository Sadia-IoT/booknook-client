import AllBooksSection from "@/components/AllBooksSection";

export const metadata = {
  title: "All Books",   
};
export default function AllBooksPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <AllBooksSection />
    </main>
  );
}
