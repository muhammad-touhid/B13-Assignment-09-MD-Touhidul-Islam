import Link from "next/link";
import { CarFront, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-16 dark:bg-[#07030e]">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ed1d26]/10">
          <CarFront size={40} className="text-[#ed1d26]" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-[#ed1d26]">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold text-[#07030e] dark:text-white sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600 dark:text-gray-400">
          Looks like this road leads nowhere. The page you're looking for may
          have been moved, deleted, or doesn't exist.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#ed1d26] px-6 py-3 font-semibold text-white transition hover:bg-[#c9151d]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
