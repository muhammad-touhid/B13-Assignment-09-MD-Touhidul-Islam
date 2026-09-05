import AddCarForm from "@/components/AddCarForm";

export default function AddCarPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-[#07030e]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#07030e] md:text-4xl dark:text-[#fefefe]">
            Add Your <span className="text-[#ed1d26]">Car</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-white/60">
            List your car on GoDrive and make it available for customers to
            rent.
          </p>
        </div>

        <AddCarForm />
      </div>
    </main>
  );
}
