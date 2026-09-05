import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CarCard({ car }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0d0915]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          width={500}
          height={300}
          src={car.imageUrl}
          alt={car.carName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Availability Badge */}
        <div
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            car.availabilityStatus === "Available"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {car.availabilityStatus}
        </div>

        {/* Car Type */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {car.carType}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-[#07030e] dark:text-[#fefefe]">
            {car.carName}
          </h2>

          <div className="shrink-0 text-right">
            <p className="text-lg font-bold text-[#ed1d26]">
              ${car.dailyRentPrice}
            </p>
            <p className="text-xs text-gray-500 dark:text-white/50">/ day</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-white/60">
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>{car.seatCapacity} Seats</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin size={16} />
            <span className="max-w-35 truncate">{car.pickupLocation}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-white/60">
          {car.description}
        </p>

        {/* Details Button */}
        <Link
          href={`/cars/${car._id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ed1d26] px-4 py-3 text-sm font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
        >
          View Details
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
