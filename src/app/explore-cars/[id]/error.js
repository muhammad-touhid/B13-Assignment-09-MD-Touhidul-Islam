"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft, CarFront } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Car details error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-[#0d0915]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
          <AlertCircle size={32} className="text-[#ed1d26]" />
        </div>

        <h2 className="text-2xl font-bold text-[#07030e] dark:text-white">
          Oops! Something Went Wrong
        </h2>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          We couldn't load this car's details. Please try again or explore our
          other available cars.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-[#ed1d26] px-5 py-3 font-semibold text-white transition hover:bg-[#c9151d]"
          >
            Try Again
          </button>

          <Link
            href="/explore-cars"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#07030e] transition hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <CarFront size={18} />
            Browse Cars
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#07030e] transition hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
