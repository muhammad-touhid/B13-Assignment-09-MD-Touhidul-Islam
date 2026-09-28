import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CarFront,
  MapPin,
  Users,
  CalendarDays,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/cars/${id}`);
  const car = await res.json();

  if (!car) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-[#07030e]">
        <h1 className="mb-3 text-2xl font-bold text-[#07030e] dark:text-[#fefefe]">
          Car Not Found
        </h1>

        <p className="mb-6 text-gray-500 dark:text-white/60">
          The car you are looking for does not exist.
        </p>

        <Link
          href="/explore-cars"
          className="rounded-xl bg-[#ed1d26] px-5 py-3 font-semibold text-white transition hover:bg-[#c9151d]"
        >
          Back to Explore Cars
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#07030e]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/explore-cars"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#ed1d26] dark:text-white/60"
        >
          <ArrowLeft size={18} />
          Back to Explore Cars
        </Link>
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0d0915] lg:grid-cols-2">
          <div className="relative min-h-80 lg:min-h-140">
            <Image
              src={car.imageUrl}
              alt={car.carName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className={`absolute left-5 top-5 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                car.availabilityStatus === "Available"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {car.availabilityStatus === "Available" ? (
                <CheckCircle2 size={17} />
              ) : (
                <XCircle size={17} />
              )}

              {car.availabilityStatus}
            </div>
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#ed1d26]">
                {car.carType}
              </p>

              <h1 className="text-3xl font-bold text-[#07030e] md:text-4xl dark:text-[#fefefe]">
                {car.carName}
              </h1>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-3xl font-bold text-[#ed1d26]">
                  ${car.dailyRentPrice}
                </span>

                <span className="pb-1 text-sm text-gray-500 dark:text-white/50">
                  / day
                </span>
              </div>
            </div>

            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                <Users size={22} className="mb-2 text-[#ed1d26]" />

                <p className="text-xs text-gray-500 dark:text-white/50">
                  Seat Capacity
                </p>

                <p className="mt-1 font-semibold text-[#07030e] dark:text-[#fefefe]">
                  {car.seatCapacity} Seats
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                <CarFront size={22} className="mb-2 text-[#ed1d26]" />

                <p className="text-xs text-gray-500 dark:text-white/50">
                  Car Type
                </p>

                <p className="mt-1 font-semibold text-[#07030e] dark:text-[#fefefe]">
                  {car.carType}
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                <MapPin size={22} className="mb-2 text-[#ed1d26]" />

                <p className="text-xs text-gray-500 dark:text-white/50">
                  Pickup Location
                </p>

                <p className="mt-1 font-semibold text-[#07030e] dark:text-[#fefefe]">
                  {car.pickupLocation}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-lg font-bold text-[#07030e] dark:text-[#fefefe]">
                About This Car
              </h2>

              <p className="text-sm leading-7 text-gray-600 dark:text-white/60">
                {car.description}
              </p>
            </div>
            <div className="mt-auto">
              {car.availabilityStatus === "Available" ? (
                <Link
                  href={`/explore-cars/${car._id}/book`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ed1d26] px-5 py-4 font-semibold text-white transition hover:bg-[#c9151d]"
                >
                  <CalendarDays size={19} />
                  Book Now
                </Link>
              ) : (
                <button
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-400 px-5 py-4 font-semibold text-white"
                >
                  <XCircle size={19} />
                  Currently Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
