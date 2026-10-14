
"use client";

import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Jake Weary",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    rating: 4,
    text: "Suscipit tellus mauris a diam maecenas. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor urna nunc id cursus. Scelerisque purus semper eget duis at. Pharetra vel turpis nunc eget.",
  },
  {
    name: "Penny Tool",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    rating: 4,
    text: "Suscipit tellus mauris a diam maecenas. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor urna nunc id cursus. Scelerisque purus semper eget duis at. Pharetra vel turpis nunc eget.",
  },
  {
    name: "Alex Morgan",
    role: "Fashion Designer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    text: "Excellent products and a smooth shopping experience. The quality was great, the design is beautiful, and the service was helpful throughout my order.",
  },
  {
    name: "Sophia Lee",
    role: "Beauty Consultant",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    text: "I love the collection and the overall shopping experience. Everything was easy to find, and the products arrived looking just as expected.",
  },
];

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Next slide
  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  // Previous slide
  const prevSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + reviews.length) % reviews.length
    );
  };

  // Automatic slider: প্রতি ৪ সেকেন্ডে রিভিউ পরিবর্তন হবে
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // একসঙ্গে দুটি রিভিউ দেখাবে
  const visibleReviews = [
    reviews[activeIndex],
    reviews[(activeIndex + 1) % reviews.length],
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-medium text-pink-500 sm:text-base">
            Customers Review
          </p>

          <h2 className="text-3xl font-semibold text-[#061522] sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </div>

        {/* Automatic Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
            {visibleReviews.map((review, index) => (
              <article
                key={review.name}
                className="relative min-h-[320px] animate-[fadeIn_0.6s_ease-in-out] overflow-hidden bg-[#f5f5f5] p-6 sm:p-8 lg:min-h-[345px] lg:p-10"
              >
                {/* Stars */}
                <div
                  className="mb-6 flex gap-1 text-xl"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={
                        starIndex < review.rating
                          ? "text-[#061522]"
                          : "text-gray-400"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <p className="relative z-10 text-base leading-[1.85] text-[#555b63] sm:text-lg">
                  {review.text}
                </p>

                {/* Customer Information */}
                <div className="relative z-10 mt-7 flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="font-semibold text-[#061522]">
                      {review.name}
                    </span>

                    <span className="text-[#061522]">/</span>

                    <span className="text-[#555b63]">
                      {review.role}
                    </span>
                  </div>
                </div>

                {/* Decorative Quote */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-5 right-7 text-[100px] font-bold leading-none text-[#e8e8e8]"
                >
                  ”
                </span>
              </article>
            ))}
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-sm transition hover:bg-[#061522] hover:text-white lg:flex"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-sm transition hover:bg-[#061522] hover:text-white lg:flex"
          >
            ›
          </button>
        </div>

        {/* Slider Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show review ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-3 w-3 rounded-full border border-[#58616a] transition ${
                activeIndex === index
                  ? "bg-[#58616a]"
                  : "bg-white hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fade-in Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0.45;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}