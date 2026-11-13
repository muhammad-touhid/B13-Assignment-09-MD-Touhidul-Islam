import { Suspense } from "react";
import BookingList from "@/components/BookingList";

function LoadingSpinner() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#ed1d26]" />
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <main className="container m-auto my-10 space-y-8 px-5">
      <h1 className="my-12 text-3xl font-bold text-gray-900 md:text-5xl dark:text-[#fefefe]">
        My Bookings
      </h1>

      <Suspense fallback={<LoadingSpinner />}>
        <BookingList />
      </Suspense>
    </main>
  );
}
