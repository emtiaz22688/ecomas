
import Link from "next/link";

export default function BeautyBanner({ banner }) {
  if (!banner) {
    return null;
  }

  return (
    <section className="w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-2xl bg-[#f8e9e5]">
          {/* Banner Image */}
          <div className="absolute inset-0 -z-10">
            {banner.image && (
              <img
                src={banner.image}
                alt={banner.title || "Beauty collection"}
                className="h-full w-full object-cover object-center"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[#f8e9e5] via-[#f8e9e5]/95 to-[#f8e9e5]/20" />
          </div>

          {/* Banner Content */}
          <div className="flex min-h-[320px] items-center px-6 py-10 sm:min-h-[360px] sm:px-10 sm:py-12 lg:min-h-[420px] lg:px-16">
            <div className="max-w-xl">
              {/* Eyebrow */}
              {banner.eyebrow && (
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] !text-[#a94f59] sm:text-sm">
                  {banner.eyebrow}
                </p>
              )}

              {/* Heading */}
              <h1 className="max-w-lg text-3xl font-semibold leading-tight !text-[#402c2b] sm:text-4xl md:text-5xl lg:text-6xl">
                {banner.title}
              </h1>

              {/* Description */}
              {banner.description && (
                <p className="mt-4 max-w-md text-sm leading-6 !text-gray-700 sm:text-base sm:leading-7">
                  {banner.description}
                </p>
              )}

              {/* Shop Now Button */}
              {banner.buttonText && (
                <Link
                  href="/shop"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#a94f59] px-6 py-3 text-sm font-semibold !text-white transition duration-300 hover:bg-[#873b45] focus:outline-none focus:ring-2 focus:ring-[#a94f59] focus:ring-offset-2 sm:px-8 sm:py-3.5"
                >
                  {banner.buttonText}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}