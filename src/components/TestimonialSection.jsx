import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "GoDrive made my travel experience so easy. The booking process was simple, and the car was clean and comfortable. Highly recommended!",
  },
  {
    name: "Nusrat Jahan",
    role: "Business Traveler",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "I had a great experience with GoDrive. The pricing was reasonable, and finding the right car for my business trip was quick and hassle-free.",
  },
  {
    name: "Tanvir Hasan",
    role: "Happy Customer",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "A very convenient car rental platform! I could easily explore available cars and complete my booking without any complications.",
  },
];

export default function TestimonialSection() {
  return (
    <section className="px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-[#ed1d26] dark:bg-[#ed1d26]/10">
            Testimonials
          </span>

          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Our customers make every journey worthwhile. See what they say about
            their experience with GoDrive.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-white/10 dark:bg-[#0d0915]"
            >
              {/* Quote Icon */}
              <div className="mb-5 flex items-center justify-between">
                <Quote
                  size={35}
                  className="text-[#ed1d26]"
                  fill="currentColor"
                />

                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review */}
              <p className="mb-8 text-sm leading-7 text-gray-600 dark:text-gray-300">
                "{testimonial.review}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-5 dark:border-white/10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
