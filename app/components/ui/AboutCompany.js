import Image from "next/image";
import Link from "next/link";

export default function AboutCompany() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">

        {/* Left: Overlapping Images */}
        <div className="relative mx-auto w-full max-w-[620px] pb-10 pr-0 sm:pb-12 sm:pr-12">
          {/* Main Image */}
          <div className="relative h-[380px] w-full overflow-hidden sm:h-[480px] lg:h-[600px]">
            <Image
              src="/about-craft-woman.jpg"
              alt="Craftswoman working on a handmade product"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Small Overlapping Image */}
          <div className="absolute bottom-0 right-0 h-[180px] w-[48%] overflow-hidden border-4 border-white sm:h-[250px] sm:w-[45%] lg:h-[300px]">
            <Image
              src="/about-interior.jpg"
              alt="Modern interior design"
              fill
              sizes="(max-width: 1024px) 45vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center lg:pl-2">
          <p className="mb-4 text-base font-normal text-[#c98243] sm:text-lg">
            Unity Collection
          </p>

          <h2 className="max-w-xl text-3xl font-medium leading-tight text-[#06131d] sm:text-4xl lg:text-[46px]">
            Shop Our Limited Edition Collaborations
          </h2>

          <p className="mt-7 text-sm leading-7 text-slate-600 sm:mt-10 sm:text-base sm:leading-[30px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel
            mi quam. Fusce vehicula vitae mauris sit amet tempor. Donec
            consectetur lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            dolore magna
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-[#03111c] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#c98243]"
            >
              More About Us
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}