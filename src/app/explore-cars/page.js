"use client";

import CarCard from "@/components/shared/CarCard";
import { useEffect, useState } from "react";

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      setError("");
      try {
        setLoading(true);

        const params = new URLSearchParams({
          search: search,
          type: type,
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cars?${params}`,
        );

        const data = await res.json();

        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [search, type]);

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
        <div className="mb-10 max-w-xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by car name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border p-3  text-black  dark:text-white dark:border-gray-700"
          >
            <option
              value="All"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              All Car Types
            </option>
            <option
              value="SUV"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              SUV
            </option>
            <option
              value="Sedan"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              Sedan
            </option>
            <option
              value="Hatchback"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              Hatchback
            </option>
            <option
              value="Luxury"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              Luxury
            </option>
          </select>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#ed1d26]" />
            <p className="mt-3 text-gray-500">Loading cars...</p>
          </div>
        ) : cars.length === 0 ? (
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
