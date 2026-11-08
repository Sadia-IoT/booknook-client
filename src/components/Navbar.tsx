"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Menu, Search, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  };

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

  <Link href="/books" className="text-gray-600 hover:text-[#174d38]">
    All Books
  </Link>

  {!isPending && session && (
    <>
      <Link href="/add-book" className="text-gray-600 hover:text-[#174d38]">
        Add Book
      </Link>

      <Link href="/my-books" className="text-gray-600 hover:text-[#174d38]">
        My Books
      </Link>

      <Link href="/my-borrows" className="text-gray-600 hover:text-[#174d38]">
        My Borrows
      </Link>
    </>
  )}
</div>

        {/* Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="text-gray-600 hover:text-[#174d38]">
            <Search size={21} />
          </button>

          {!isPending && !session && (
            <>
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
            </>
          )}

          {!isPending && session && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 hover:bg-gray-100"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#174d38] font-semibold text-white">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <span className="max-w-28 truncate font-medium text-[#174d38]">
                  {session.user.name}
                </span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden text-[#174d38]"
  aria-label="Toggle menu"
  aria-expanded={isMenuOpen}
>
  <Menu size={25} />
</button>
{isMenuOpen && (
  <div className="border-t border-[#e8e6df] bg-[#faf9f6] px-5 py-4 md:hidden">
    <div className="flex flex-col gap-4">
      <Link href="/" onClick={() => setIsMenuOpen(false)}>
        Home
      </Link>

      <Link href="/books" onClick={() => setIsMenuOpen(false)}>
        All Books
      </Link>

      {!isPending && session && (
        <>
          <Link href="/add-book" onClick={() => setIsMenuOpen(false)}>
            Add Book
          </Link>

          <Link href="/my-books" onClick={() => setIsMenuOpen(false)}>
            My Books
          </Link>

          <Link href="/my-borrows" onClick={() => setIsMenuOpen(false)}>
            My Borrows
          </Link>

          <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
            My Profile
          </Link>

          <button onClick={handleLogout} className="text-left text-red-600">
            Logout
          </button>
        </>
      )}

      {!isPending && !session && (
        <>
          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>

          <Link href="/register" onClick={() => setIsMenuOpen(false)}>
            Register
          </Link>
        </>
      )}
    </div>
  </div>
)}
      </nav>
    </header>
  );
}