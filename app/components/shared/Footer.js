
"use client";

import Link from "next/link";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const accountLinks = [
        { name: "Track Orders", href: "/track-orders" },
        { name: "Shipping", href: "/shipping" },
        { name: "Wishlist", href: "/wishlist" },
        { name: "My Account", href: "/account" },
        { name: "Order History", href: "/order-history" },
        { name: "Returns", href: "/returns" },
    ];

    const informationLinks = [
        { name: "Our Story", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Latest News", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
    ];

    const linkClass =
        "flex items-start gap-3 text-sm leading-6 text-gray-300 transition hover:text-pink-400";

    const headingClass =
        "mb-5 text-lg font-semibold text-white sm:text-xl";

    return (
        <footer className="relative w-full bg-[#03111c] text-gray-300">
            <div className="mx-auto box-border w-full max-w-[1240px] px-5 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:py-16">

                {/* FOOTER MAIN CONTENT */}
                <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">

                    {/* BRAND SECTION */}
                    <div className="min-w-0">
                        <Link
                            href="/"
                            className="mb-5 inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-white"
                        >
                            <svg
                                width="36"
                                height="40"
                                viewBox="0 0 36 40"
                                fill="none"
                                aria-hidden="true"
                                className="shrink-0"
                            >
                                <path
                                    d="M8 12V8a6 6 0 0 1 12 0v4"
                                    stroke="#ec4899"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <rect
                                    x="4"
                                    y="12"
                                    width="27"
                                    height="25"
                                    rx="3"
                                    stroke="#ec4899"
                                    strokeWidth="2.5"
                                />
                                <path
                                    d="m10 19 7.5 6 7.5-6"
                                    stroke="#ec4899"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>ecomas</span>
                        </Link>

                        <p className="mb-5 max-w-[300px] text-sm leading-7 text-gray-300 sm:text-[15px]">
                            We are a team of designers and developers that
                            create high quality WordPress websites.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center border border-white/10 text-lg font-bold text-white transition hover:border-pink-400 hover:bg-pink-500"
                            >
                                f
                            </a>

                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="flex h-10 w-10 items-center justify-center border border-white/10 text-white transition hover:border-pink-400 hover:bg-pink-500"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 5.9a8 8 0 0 1-2.36.65 4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6.99 4.08 4.08 0 0 0-7 3.72A11.58 11.58 0 0 1 3.43 4.7a4.08 4.08 0 0 0 1.26 5.45 4.05 4.05 0 0 1-1.85-.51v.05a4.09 4.09 0 0 0 3.27 4 4.1 4.1 0 0 1-1.84.07 4.1 4.1 0 0 0 3.82 2.84A8.2 8.2 0 0 1 2 18.3a11.55 11.55 0 0 0 6.26 1.83c7.51 0 11.62-6.23 11.62-11.63l-.01-.53A8.3 8.3 0 0 0 22 5.9Z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center border border-white/10 text-lg font-bold text-white transition hover:border-pink-400 hover:bg-pink-500"
                            >
                                in
                            </a>

                            <a
                                href="https://vimeo.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Vimeo"
                                className="flex h-10 w-10 items-center justify-center border border-white/10 text-lg font-bold text-white transition hover:border-pink-400 hover:bg-pink-500"
                            >
                                v
                            </a>
                        </div>
                    </div>

                    {/* MY ACCOUNT */}
                    <div className="min-w-0">
                        <h3 className={headingClass}>My Account</h3>

                        <ul className="m-0 list-none space-y-2 p-0">
                            {accountLinks.map((item) => (
                                <li key={item.name} className="m-0 p-0">
                                    <Link href={item.href} className={linkClass}>
                                        <span className="text-pink-400">•</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* INFORMATION */}
                    <div className="min-w-0">
                        <h3 className={headingClass}>Information</h3>

                        <ul className="m-0 list-none space-y-2 p-0">
                            {informationLinks.map((item) => (
                                <li key={item.name} className="m-0 p-0">
                                    <Link href={item.href} className={linkClass}>
                                        <span className="text-pink-400">•</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* TALK TO US */}
                    <div className="min-w-0">
                        <h3 className={headingClass}>Talk To Us</h3>

                        <p className="mb-2 text-sm leading-6">
                            Got Questions? Call us
                        </p>

                        <a
                            href="tel:+67041390762"
                            className="mb-5 block break-words text-lg font-bold text-white transition hover:text-pink-400 sm:text-xl"
                        >
                            +670 413 90 762
                        </a>

                        {/* EMAIL */}
                        <a
                            href="mailto:cartly@gmail.com"
                            className="mb-4 flex min-w-0 items-start gap-3 break-all text-sm leading-6 transition hover:text-pink-400"
                        >
                            <svg
                                className="mt-1 shrink-0"
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <rect
                                    x="3"
                                    y="5"
                                    width="18"
                                    height="14"
                                    rx="1"
                                />
                                <path d="m3 7 9 6 9-6" />
                            </svg>
                            <span>cartly@gmail.com</span>
                        </a>

                        {/* ADDRESS */}
                        <div className="flex min-w-0 items-start gap-3 text-sm leading-7">
                            <svg
                                className="mt-1 shrink-0"
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>

                            <p className="m-0 min-w-0">
                                79 Sleepy Hollow St.
                                <br />
                                Jamaica, New York 1432
                            </p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM FOOTER */}
                <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm leading-6">
                        © All Rights Reserved | By{" "}
                        <Link
                            href="/"
                            className="font-semibold text-white transition hover:text-pink-400"
                        >
                            Ecomas.
                        </Link>
                    </p>

                    {/* PAYMENT METHODS */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex h-[31px] items-center rounded-sm bg-white px-2 text-xs font-bold italic text-[#173b80]">
                            PayPal
                        </div>

                        <div className="flex h-[31px] items-center rounded-sm bg-white px-3 text-[13px] font-black italic text-[#14347a]">
                            VISA
                        </div>

                        <div className="flex h-[31px] items-center rounded-sm bg-white px-2">
                            <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
                            <span className="-ml-1 h-4 w-4 rounded-full bg-[#f79e1b]" />
                        </div>

                        <div className="flex h-[31px] items-center rounded-sm bg-white px-2 text-xs font-bold text-[#635bff]">
                            stripe
                        </div>
                    </div>
                </div>
            </div>

            {/* SCROLL TO TOP BUTTON */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#c58b4d] text-2xl text-white shadow-lg transition hover:bg-pink-500 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 sm:text-3xl"
            >
                ↑
            </button>
        </footer>
    );
}
