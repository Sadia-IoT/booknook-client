
"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useSyncExternalStore } from "react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    badge: "Your Personal Digital Library",
    title: "Discover Stories, Explore New Worlds.",
    description:
      "Find your next favorite book, explore different genres, and enjoy a wonderful reading journey with BookNook.",
    background:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
  },
  {
    badge: "A World of Knowledge",
    title: "Read More, Learn More, Grow More.",
    description:
      "Explore inspiring books, discover new ideas, and make every day a chance to learn something new.",
    background:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2000",
  },
  {
    badge: "Your Next Chapter Starts Here",
    title: "Find Your Next Favorite Book.",
    description:
      "Browse our growing collection, borrow interesting books, and enjoy reading at your own pace.",
    background:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000",
  },
];
export default function HeroSection() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isMounted) {
    return <section className="min-h-[560px] bg-[#faf9f6]" />;
  }

  return (
    <section
      className="overflow-hidden bg-[#174d38]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        speed={700}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
  className="relative mx-auto grid min-h-[580px] max-w-7xl items-center gap-12 bg-cover bg-center bg-no-repeat px-5 py-16 lg:px-8 lg:py-20 md:grid-cols-2"
  style={{
    backgroundImage: `linear-gradient(90deg, rgba(15,35,27,0.92), rgba(15,35,27,0.65)), url('${slide.background}')`,
  }}
>

              {/* Left Content */}
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-[#e8bd7d] backdrop-blur-sm">
                  <Sparkles size={16} />
                  {slide.badge}
                </div>

                <h1 className="max-w-xl text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-lg text-base leading-8 text-white/80 md:text-lg">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#d99a45] px-7 py-4 font-semibold text-[#26372e] transition hover:bg-[#e8bd7d]"
                >
                  Browse Books
                  <ArrowRight size={19} />
                </Link>

                <div className="mt-12 flex items-center gap-3 text-sm text-white/70">
                  <BookOpen size={20} className="text-[#e8bd7d]" />
                  <span>A little corner for every book lover.</span>
                </div>
              </div>

              {/* Right Book Covers */}
              <div className="relative flex items-center justify-center gap-5 py-8">

                {/* Book Cover 1 */}
                <div className="relative w-[42%] max-w-[210px] aspect-[2/3] overflow-hidden rounded-lg bg-[#174d38] shadow-2xl transition duration-500 hover:-translate-y-3">
                  <div className="absolute inset-2 border border-[#e8bd7d]/50" />

                  <div className="relative flex h-full flex-col items-center justify-center p-5 text-center text-white">
                    <Sparkles size={32} className="mb-8 text-[#e8bd7d]" />
                    <p className="text-[10px] tracking-[0.3em] text-[#e8bd7d]">
                      THE ART OF
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-bold">
                      Reading
                    </h2>
                    <div className="my-5 h-px w-12 bg-[#e8bd7d]" />
                    <p className="text-xs tracking-widest text-white/70">
                      A WORLD OF STORIES
                    </p>
                  </div>
                </div>

                {/* Book Cover 2 */}
                <div className="relative mt-12 w-[42%] max-w-[210px] aspect-[2/3] overflow-hidden rounded-lg bg-[#d99a45] shadow-2xl transition duration-500 hover:-translate-y-3">
                  <div className="absolute inset-2 border border-[#49341e]/40" />

                  <div className="relative flex h-full flex-col items-center justify-center p-5 text-center text-[#49341e]">
                    <BookOpen size={34} className="mb-8" />
                    <p className="text-[10px] tracking-[0.3em]">
                      OPEN YOUR
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-bold">
                      Mind
                    </h2>
                    <div className="my-5 h-px w-12 bg-[#49341e]" />
                    <p className="text-xs tracking-widest">
                      ENDLESS POSSIBILITIES
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
