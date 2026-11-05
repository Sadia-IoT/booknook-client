
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Image
        src={image}
        alt={title}
        width={640}
        height={256}
        unoptimized
        className="h-64 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          By {author}
        </p>

        <p className="mt-4 text-sm font-medium text-green-700">
          Available Copies: {availableCopies}
        </p>

        <Link
          href={`/books/${id}`}
          className="mt-5 block rounded-lg bg-green-700 px-4 py-3 text-center font-medium text-white transition hover:bg-green-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
