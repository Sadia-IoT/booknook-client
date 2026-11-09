import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-green-100 bg-[#f1f7f2]">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
                <BookOpen size={23} />
              </div>

              <span className="text-2xl font-bold text-green-800">
                BookNook
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-600">
              Your little corner of books. Discover, borrow, and enjoy
              your favorite reads with BookNook.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-green-700">Home</Link></li>
              <li><Link href="/books" className="hover:text-green-700">All Books</Link></li>
              <li><Link href="/add-book" className="hover:text-green-700">Add Book</Link></li>
              <li><Link href="/my-books" className="hover:text-green-700">My Books</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-green-700" />
                <a href="mailto:sadiasultana42243@gmail.com" className="hover:text-green-700">
                  sadiasultana42243@gmail.com
                </a>
              </li>

            

              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-green-700" />
                <span>Bangladesh</span>
              </li>
            </ul>
          </div>

        {/* Social Links */}
<div>
  <h3 className="mb-5 text-lg font-bold text-gray-900">
    Follow Us
  </h3>

  <p className="mb-4 text-sm text-gray-600">
    Stay connected with BookNook.
  </p>

  <div className="flex flex-wrap gap-3">
    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-700 hover:text-white"
    >
      Facebook
    </a>

    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-700 hover:text-white"
    >
      Instagram
    </a>

    <a
      href="https://github.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-700 hover:text-white"
    >
      GitHub
    </a>
  </div>
</div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-green-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © BookNook. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
