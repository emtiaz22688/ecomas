import Link from "next/link";

export default function CosmeticsCollection() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr]">

          {/* Left Collection Card */}
          <div
            className="relative flex min-h-[420px] flex-col items-start bg-[#e5e5e5] bg-cover bg-center px-6 py-10 sm:min-h-[520px] sm:px-10 sm:py-14 lg:min-h-[700px] lg:px-14 lg:py-16"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85')",
            }}
          >
            <p className="mb-4 text-sm font-normal text-[#061522] sm:text-base">
              Cosmetics Collection
            </p>

            <h2 className="max-w-[420px] text-3xl font-semibold leading-tight text-[#061522] sm:text-4xl lg:text-5xl lg:leading-[1.4]">
              Foundation And Powder Brush
            </h2>
<Link
  href="/shop"
  className="inline-flex items-center justify-center gap-3 border border-white/30 bg-[#1f2937] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
>
  Discover Now
  <span className="text-white">→</span>
</Link>
          </div>

          {/* Right Collection Card */}
          <Link
            href="/shop"
            className="group relative block min-h-[420px] overflow-hidden bg-[#a8aaa4] sm:min-h-[520px] lg:min-h-[700px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85')",
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-8 left-6 right-5 text-white sm:bottom-12 sm:left-8 lg:bottom-14 lg:left-12">
              <h2 className="max-w-[350px] text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
                Best Cosmetics For Hair And Skin
              </h2>

              <p className="mt-4 text-xs font-medium tracking-[0.25em] sm:text-sm sm:tracking-[0.3em]">
                SHOP COLLECTION
              </p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}