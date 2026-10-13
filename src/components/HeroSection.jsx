"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section
      className="relative flex h-[80vh] w-full items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl text-white">
          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Find Your Perfect Ride
          </h1>

          <p className="mb-8 max-w-xl text-base text-gray-200 md:text-lg">
            Discover the perfect car for every journey. Book your ride easily
            and enjoy a comfortable, reliable driving experience with GoDrive.
          </p>

          <button
            onClick={() => router.push("/explore-cars")}
            className="rounded-lg bg-[#ed1d26] px-7 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Explore Cars
          </button>
        </div>
      </div>
    </section>
  );
}
