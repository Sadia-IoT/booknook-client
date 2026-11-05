
import Image from "next/image";
import Link from "next/link";

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  availableCopies: number;
  image: string;
};

export default function BookCard({
  id,
  title,
  author,
  availableCopies,
  image,
}: BookCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Book Image */}
      <div className="relative flex h-56 w-full shrink-0 items-center justify-center bg-gray-50 px-1 py-3 sm:h-64">
        <Image
          src={image}
          alt={title}
          width={300}
          height={400}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-14 text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 truncate text-sm text-gray-600">
          By {author}
        </p>

        <p className="mt-3 text-sm font-medium text-green-700">
          Available Copies: {availableCopies}
        </p>

        <Link
          href={`/books/${id}`}
          className="mt-auto block rounded-lg bg-green-700 px-4 py-3 text-center font-medium text-white transition hover:bg-green-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
