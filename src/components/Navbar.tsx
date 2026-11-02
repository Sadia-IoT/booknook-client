
import Link from "next/link";
import { BookOpen, Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e6df] bg-[#faf9f6]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-[#174d38] p-2 text-white">
            <BookOpen size={24} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-[#174d38]">
            BookNook
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="font-medium text-[#174d38]">
            Home
          </Link>

          <Link href="/books" className="text-gray-600 transition hover:text-[#174d38]">
            All Books
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="text-gray-600 hover:text-[#174d38]">
            <Search size={21} />
          </button>

          <Link
            href="/login"
            className="rounded-full border border-[#174d38] px-5 py-2 font-medium text-[#174d38] transition hover:bg-[#174d38] hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#174d38] px-5 py-2 font-medium text-white transition hover:bg-[#103b2b]"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" aria-label="Open menu">
          <Menu size={25} />
        </button>
      </nav>
    </header>
  );
}
