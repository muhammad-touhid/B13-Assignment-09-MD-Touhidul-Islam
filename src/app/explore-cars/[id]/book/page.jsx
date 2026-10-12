import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getCar(id) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function BookingPage({ params }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-[#07030e]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#07030e] dark:text-[#fefefe]">
            Car Not Found
          </h1>

          <Link
            href="/explore-cars"
            className="mt-5 inline-block rounded-xl bg-[#ed1d26] px-5 py-3 font-semibold text-white"
          >
            Back to Cars
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12 dark:bg-[#07030e]">
      <div className="mx-auto max-w-2xl">
        <BookingForm car={car} />
      </div>
    </main>
  );
}
