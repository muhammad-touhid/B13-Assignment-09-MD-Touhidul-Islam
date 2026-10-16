"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CarCard from "@/components/shared/CarCard";

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/available-cars`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch available cars");
        }

        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <section className="px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-[#ed1d26]">
            Find Your Ride
          </p>

          <h2 className="text-3xl font-bold text-[#07030e] dark:text-white md:text-4xl">
            Available Cars
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore our available cars and find the perfect ride for your next
            journey.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-10 text-center">Loading available cars...</p>
        )}

        {/* Car Cards */}
        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}

        {/* No Cars */}
        {!loading && cars.length === 0 && (
          <p className="py-10 text-center text-gray-500">
            No available cars at the moment.
          </p>
        )}

        {/* View All Cars */}
        <div className="mt-10 text-center">
          <Link
            href="/explore-cars"
            className="inline-block rounded-xl bg-[#ed1d26] px-6 py-3 font-semibold text-white transition hover:bg-[#c9151d]"
          >
            Explore All Cars
          </Link>
        </div>
      </div>
    </section>
  );
}
