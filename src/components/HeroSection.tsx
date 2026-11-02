
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#faf9f6]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-8 lg:py-28">

        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e9eee9] px-4 py-2 text-sm font-medium text-[#174d38]">
            <Sparkles size={16} />
            Your Personal Digital Library
          </div>

          <h1 className="max-w-xl text-5xl leading-tight font-bold tracking-tight text-[#174d38] md:text-6xl">
            Discover Stories,
            <span className="text-[#d99a45]"> Explore </span>
            New Worlds.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Find your next favorite book, explore different genres,
            and enjoy a wonderful reading journey with BookNook.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-full bg-[#174d38] px-7 py-4 font-semibold text-white transition hover:bg-[#103b2b]"
            >
              Explore Books
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-[#174d38] px-7 py-4 font-semibold text-[#174d38] transition hover:bg-[#e9eee9]"
            >
              Join Our Library
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-gray-500">
            <BookOpen size={20} className="text-[#174d38]" />
            <span>A little corner for every book lover.</span>
          </div>
        </div>

        {/* Right Book Showcase */}
        <div className="relative flex min-h-[400px] items-center justify-center rounded-[2rem] bg-[#e9eee9] p-8">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#d99a45]/20 blur-2xl" />

          <div className="relative grid w-full max-w-md grid-cols-2 gap-5">
            <div className="mt-12 flex h-64 items-center justify-center rounded-2xl bg-[#174d38] p-6 shadow-xl">
              <div className="text-center text-white">
                <BookOpen size={48} className="mx-auto mb-5 text-[#e8bd7d]" />
                <p className="text-xs tracking-[0.3em] text-[#e8bd7d]">
                  THE ART OF
                </p>
                <h2 className="mt-3 text-2xl font-serif font-bold">
                  Reading
                </h2>
                <p className="mt-4 text-xs text-white/70">
                  A WORLD OF STORIES
                </p>
              </div>
            </div>

            <div className="flex h-64 items-center justify-center rounded-2xl bg-[#d99a45] p-6 shadow-xl">
              <div className="text-center text-[#3d3020]">
                <Sparkles size={42} className="mx-auto mb-5" />
                <p className="text-xs tracking-[0.3em]">OPEN YOUR</p>
                <h2 className="mt-3 text-3xl font-serif font-bold">
                  Mind
                </h2>
                <p className="mt-4 text-xs">ENDLESS POSSIBILITIES</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
