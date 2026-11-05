
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
         <Navbar />
        {children}</body>
    </html>
  );
}
