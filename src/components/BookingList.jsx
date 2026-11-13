import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { CalendarDays } from "lucide-react";
import { headers } from "next/headers";

export default async function BookingList() {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#0d0915]">
        Please log in to view your bookings.
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

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

  if (!bookings || bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white py-60 text-center dark:border-white/10 dark:bg-[#0d0915]">
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
    <div className="space-y-5">
      {bookings.map((booking) => {
        const bookingDate = new Date(booking.bookingDate);

        return (
          <div
            key={booking._id}
            className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row dark:border-white/10 dark:bg-[#0d0915]"
          >
            <div className="relative min-h-48 w-full shrink-0 md:w-64 lg:w-72">
              <img
                src={booking.carImage}
                alt={booking.carName}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-[#fefefe]">
                  {booking.carName}
                </h2>

                <div className="mt-6 mb-16 grid grid-cols-2 gap-6">
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

            <div className="absolute right-5 bottom-5 md:top-5 md:right-5">
              <BookingCancelAlert bookingId={booking._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
