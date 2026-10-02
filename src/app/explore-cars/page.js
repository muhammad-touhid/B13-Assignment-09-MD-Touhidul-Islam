"use client";

import CarCard from "@/components/shared/CarCard";
import { useEffect, useState } from "react";

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/cars");

        if (!res) {
          throw new Error("Failed to fetch cars");
        }

        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#07030e]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#ed1d26]" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#07030e]">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-[#07030e]">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#ed1d26]">
            Find Your Ride
          </p>

          <h1 className="text-3xl font-bold text-[#07030e] md:text-4xl dark:text-[#fefefe]">
            Explore <span className="text-[#ed1d26]">Cars</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-white/60">
            Discover the perfect car for your next journey. Choose from our wide
            range of reliable and comfortable vehicles.
          </p>
        </div>

        {/* Cars Grid */}
        {cars.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 dark:text-white/60">
              No cars available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
