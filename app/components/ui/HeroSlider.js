
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        image: "/images/hero-1.jpg",
        offer: "Up To 20% Off",
        title: "Discover The Beauty Within You!",
        button: "Discover Now",
        fallback: "from-cyan-700 via-teal-500 to-pink-300",
    },
    {
        image: "/images/hero-2.jpg",
        offer: "New Collection",
        title: "Discover Your Everyday Beauty",
        button: "Shop Now",
        fallback: "from-violet-800 via-fuchsia-500 to-rose-300",
    },
    {
        image: "/images/hero-3.jpg",
        offer: "Special Offers",
        title: "Your Beauty, Your Confidence",
        button: "Explore Now",
        fallback: "from-blue-900 via-indigo-600 to-purple-300",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [failedImages, setFailedImages] = useState({});

    // Navbar-er Dark Mode detect korbe
    useEffect(() => {
        const updateTheme = () => {
            setDarkMode(
                document.documentElement.classList.contains("dark")
            );
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // Automatic slider: every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <section
            className={`relative isolate w-full overflow-hidden transition-colors duration-500 ${darkMode ? "bg-slate-950" : "bg-cyan-100"
                }`}
        >
            {/* Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={slide.image}
                    className={`absolute inset-0 transition-opacity duration-1000 ${current === index
                            ? "opacity-100"
                            : "pointer-events-none opacity-0"
                        }`}
                >
                    {failedImages[index] ? (
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${slide.fallback}`}
                        />
                    ) : (
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            onError={() =>
                                setFailedImages((prev) => ({
                                    ...prev,
                                    [index]: true,
                                }))
                            }
                            className="object-cover object-center"
                        />
                    )}

                    {/* Dark Mode Overlay */}
                    <div
                        className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${darkMode
                                ? "bg-indigo-950/20"
                                : "bg-cyan-100/10"
                            }`}
                    />
                </div>
            ))}

            {/* Hero Content */}
            <div className="relative z-10 mx-auto flex min-h-[400px] w-full max-w-[1440px] items-center px-5 py-12 sm:min-h-[480px] sm:px-8 sm:py-16 md:min-h-[540px] md:px-12 lg:min-h-[680px] lg:px-20">
                <div
                    key={current}
                    className={`w-full max-w-xl ${darkMode ? "text-white" : "text-[#061522]"
                        } animate-[slideUp_0.7s_ease-out]`}
                >
                    <p className="mb-4 text-base font-medium sm:text-lg md:text-xl">
                        {slides[current].offer}
                    </p>

                    <h1 className="max-w-[550px] break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        {slides[current].title}
                    </h1>

                    {/* Features */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium sm:mt-8 sm:gap-5 md:text-base">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✧</span>
                            <span>
                                High-End
                                <br />
                                Cosmetics
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-2xl">♧</span>
                            <span>
                                Vegan
                                <br />
                                Product
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-2xl">◎</span>
                            <span>
                                Express
                                <br />
                                Make-Up
                            </span>
                        </div>
                    </div>

                    {/* Shop Button */}
                    <Link
                        href="/shop"
                        className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#ed4eae] px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#d93698] sm:mt-9 sm:px-7 sm:py-4"
                    >
                        {slides[current].button}
                        <span>→</span>
                    </Link>
                </div>
            </div>

            {/* Previous Arrow */}
            <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className={`absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-2xl transition duration-300 sm:left-4 sm:h-12 sm:w-12 sm:text-3xl md:left-8 ${darkMode
                        ? "bg-slate-800/90 text-white hover:bg-pink-500"
                        : "bg-white/90 text-[#061522] hover:bg-pink-100"
                    }`}
            >
                ‹
            </button>

            {/* Next Arrow */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className={`absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-2xl transition duration-300 sm:right-4 sm:h-12 sm:w-12 sm:text-3xl md:right-8 ${darkMode
                        ? "bg-slate-800/90 text-white hover:bg-pink-500"
                        : "bg-white/90 text-[#061522] hover:bg-pink-100"
                    }`}
            >
                ›
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3 sm:bottom-6">
                {slides.map((slide, index) => (
                    <button
                        key={slide.image}
                        type="button"
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={current === index ? "true" : undefined}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${current === index
                                ? "scale-110 bg-[#ed4eae]"
                                : darkMode
                                    ? "bg-white/60 hover:bg-white"
                                    : "bg-slate-400 hover:bg-slate-600"
                            }`}
                    />
                ))}
            </div>

            {/* Text Animation */}
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
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

