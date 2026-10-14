export default function ContactMap() {
  // এখানে নিজের business address বসাবে
  const location = "Envato, Melbourne VIC 3000, Australia";

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    location
  )}&z=15&output=embed`;

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="group relative w-full overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
          {/* Google Map */}
          <iframe
            title="Our Business Location on Google Maps"
            src={mapUrl}
            width="100%"
            height="420"
            style={{
              border: 0,
              display: "block",
              filter: "grayscale(100%)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Open Google Maps */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-md transition hover:bg-gray-900 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M14 3h7v7" />
              <path d="M10 14 21 3" />
              <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}