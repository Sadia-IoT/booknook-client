
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "BookNook | Your Digital Library",
    template: "%s | BookNook",
  },
  description:
    "Discover, borrow, and manage your favorite books with BookNook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Toaster position="top-right" />
         <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
