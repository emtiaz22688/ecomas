import Image from "next/image";

export default function OurJurney() {
  return (
    <section className="our-journey-section">
      <div className="our-journey-container">

        {/* LEFT COLUMN */}
        <div className="journey-left">
          <div>
            <p className="journey-label">Our Journey</p>

            <h1 className="journey-title">
              Your World At A Glance
            </h1>

            <p className="journey-description">
              Founded in a quaint but vibrant corner of the city,
              Oliva Beauty began as a small dream with a big vision.
              Our founder, a passionate advocate for natural and
              effective skincare, also to feel confident in their skin.
            </p>
          </div>

          <div className="mission-block">
            <h2 className="mission-title">Our Mission</h2>

            <p className="journey-description">
              Founded in a quaint but vibrant corner of the city,
              Oliva Beauty began as a small dream with a big vision.
              Our founder, a passionate advocate for natural and
              effective skincare, also to feel confident in their skin.
            </p>
          </div>
        </div>

        {/* CENTER IMAGE */}
       {/* CENTER IMAGE */}
<div className="journey-image">
  <Image
    src="/about-woman.png"
    alt="Woman wearing a hat and sunglasses with shopping bags"
    fill
    priority
    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 376px"
    className="journey-image-photo"
  />
</div>

        {/* RIGHT COLUMN */}
        <div className="journey-right">
          <h2 className="company-title">About Company</h2>

          <p className="journey-description">
            With a slim design, a vibrant entertainment system, and
            outstanding performance, the new Galaxy Tab A7 is a
            stylish new companion for your life. Dive head-first into
            the things you love, and easily share your favorite
            moments. Learn, explore, connect and be inspired.
          </p>

          <div className="cofounder-block">
            <h3>Co-Founder</h3>
            <p className="cofounder-signature">Oliva</p>
          </div>
        </div>

      </div>
    </section>
  );
}