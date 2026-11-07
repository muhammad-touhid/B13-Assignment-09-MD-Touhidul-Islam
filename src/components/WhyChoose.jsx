import { CarFront, Wallet, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    icon: CarFront,
    title: "Wide Range of Cars",
    description:
      "Choose from a variety of cars that match your travel needs, preferences, and budget.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description:
      "Enjoy transparent rental prices with no unnecessary complications or hidden charges.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Book your preferred car with confidence through our secure and reliable booking process.",
  },
  {
    icon: Clock,
    title: "Easy & Quick Process",
    description:
      "Find and book your desired car in just a few simple steps without wasting time.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-5 py-20 transition-colors duration-300 dark:bg-[#07030e] md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-[#ed1d26] dark:bg-[#ed1d26]/10">
            Why GoDrive?
          </span>

          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Why Choose GoDrive?
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            We make car rentals simple, convenient, and affordable. Discover why
            GoDrive is the right choice for your next journey.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-white/10 dark:bg-[#0d0915]"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-[#ed1d26] transition duration-300 group-hover:bg-[#ed1d26] group-hover:text-white dark:bg-[#ed1d26]/10">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
