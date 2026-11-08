
import {
  Search,
  BookOpen,
  RotateCcw,
  Library,
  Heart,
  Clock,
  Sparkles,
} from "lucide-react";

const borrowingSteps = [
  {
    icon: Search,
    title: "Explore Books",
    description:
      "Browse our collection and discover books that match your interests.",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Borrow a Book",
    description:
      "Choose your favorite book and borrow it for a few days.",
    number: "02",
  },
  {
    icon: RotateCcw,
    title: "Return on Time",
    description:
      "Enjoy reading and return the book when your borrowing period ends.",
    number: "03",
  },
];

const benefits = [
  {
    icon: Library,
    title: "Wide Collection",
    description:
      "Discover books from different genres and categories.",
  },
  {
    icon: Clock,
    title: "Easy Borrowing",
    description:
      "Borrow your favorite books with just a few clicks.",
  },
  {
    icon: Heart,
    title: "Personal Library",
    description:
      "Keep track of your borrowed books in one place.",
  },
  {
    icon: Sparkles,
    title: "Reading Made Simple",
    description:
      "Enjoy a simple and comfortable online library experience.",
  },
];

export default function HomeSections() {
  return (
    <>
      {/* Section 1: How Borrowing Works */}
      <section className="bg-[#f1f7f2] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-green-700">
              Simple Process
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              How Borrowing Works
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Getting your next favorite book is easier than ever.
              Follow these three simple steps.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {borrowingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-sm font-bold tracking-widest text-green-700">
                    STEP {step.number}
                  </span>

                  <div className="mx-auto my-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                    <Icon size={30} className="text-green-700" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose BookNook */}
      <section className="bg-[#faf9f6] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-green-700">
              Your Reading Companion
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose BookNook?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Everything you need to make your reading journey
              enjoyable and organized.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50">
                    <Icon size={27} className="text-green-700" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

