import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { CalendarDays, Trash } from "lucide-react";
import { headers } from "next/headers";

export default async function BookingCard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`http://localhost:5000/bookings/${user.id}`);

  if (!res.ok) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#0d0915]">
        <p className="text-gray-600 dark:text-white/60">
          Failed to load your bookings.
        </p>
      </div>
    );
  }

  const bookings = await res.json();
  console.log("Bookings Data:", bookings);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-60 text-center dark:border-white/10 dark:bg-[#0d0915]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#fefefe]">
          No Bookings Found
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-white/50">
          You haven't made any bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 my-10 container m-auto">
      <div>
        <h1 className="my-12 text-5xl font-bold text-gray-900 dark:text-[#fefefe]">
          My Bookings
        </h1>
      </div>
      <div className="space-y-5">
        {bookings.map((booking) => {
          const bookingDate = new Date(booking.bookingDate);
          return (
            <div
              key={booking._id}
              className="flex w-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md md:flex-row dark:border-white/10 dark:bg-[#0d0915] p-4"
            >
              <div className="relative min-h-48 w-full shrink-0 md:w-64 lg:w-72">
                <img
                  src={booking.carImage}
                  alt={booking.carName}
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                <div>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-[#fefefe]">
                        {booking.carName}
                      </h2>
                    </div>
                    <BookingCancelAlert bookingUserId={booking.userId} />
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ed1d26]/10 text-[#ed1d26]">
                        <CalendarDays size={17} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-white/40">
                          Booking Date
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/80">
                          {bookingDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-white/40">
                        Total Price
                      </p>
                      <p className="mt-1 text-2xl font-bold text-[#ed1d26]">
                        ${booking.dailyRentPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
