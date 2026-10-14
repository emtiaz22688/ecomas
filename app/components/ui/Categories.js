"use client";

import Link from "next/link";
import { useRef } from "react";

const categories = [
    {
        id: 1,
        name: "Women",
        slug: "women",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        description: "Discover women's fashion",
    },
    {
        id: 2,
        name: "Men",
        slug: "men",
        image:
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
        description: "Upgrade your everyday style",
    },
    {
        id: 3,
        name: "Accessories",
        slug: "accessories",
        image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        description: "Complete your perfect look",
    },
    {
        id: 4,
        name: "Baby",
        slug: "baby",
        image:
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
        description: "Little styles, big smiles",
    },
];

export default function CategorySlider() {
    const sliderRef = useRef(null);

    const slide = (direction) => {
        sliderRef.current?.scrollBy({
            left: direction * 320,
            behavior: "smooth",
        });
    };

    return (
        <section className="bg-gray-50 py-12 mb-12 dark:bg-[#111827] sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-7 flex items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
                            Explore Collections
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                            Shop by Categories
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Discover your favorite collection.
                        </p>
                    </div>

                    {/* Slider Controls */}
                    <div className="flex shrink-0 gap-2">
                        <button
                            type="button"
                            onClick={() => slide(-1)}
                            aria-label="Previous categories"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-indigo-500 hover:bg-indigo-500 hover:text-white dark:border-gray-600 dark:text-white"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={() => slide(1)}
                            aria-label="Next categories"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-indigo-500 hover:bg-indigo-500 hover:text-white dark:border-gray-600 dark:text-white"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Category Slider */}
                <div
                    ref={sliderRef}
                    className="category-slider flex gap-5 overflow-x-auto scroll-smooth pb-2"
                >
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group relative block h-[280px] w-[78%] shrink-0 overflow-hidden rounded-2xl sm:h-[320px] sm:w-[45%] lg:h-[340px] lg:w-[calc(25%-15px)]"
                        >
                            {/* Category Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-colors duration-300 group-hover:from-black/90" />

                            {/* Category Content */}
                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                <h3 className="text-xl font-bold text-white sm:text-2xl">
                                    {category.name}
                                </h3>

                                <p className="mt-2 text-sm text-gray-200">
                                    {category.description}
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                                    Explore Collection
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Hide Scrollbar Without Affecting Footer */}
            <style jsx>{`
        .category-slider {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .category-slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}