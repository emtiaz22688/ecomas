"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Nelson Richard",
    role: "Fashion designer",
    review:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.",
    rating: 4,
    avatar: "/customer-1.jpg",
  },
  {
    id: 2,
    name: "Olivia Martin",
    role: "Style consultant",
    review:
      "I really love the quality and attention to detail. The collection feels unique, stylish, and comfortable. The whole shopping experience was smooth and enjoyable.",
    rating: 5,
    avatar: "/customer-2.jpg",
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Creative designer",
    review:
      "The designs are beautiful and the quality is excellent. I appreciate the thoughtful details and modern style.",
    rating: 5,
    avatar: "/customer-3.jpg",
  },
];

export default function CustomerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  function nextReview() {
    setActiveIndex((index) => (index + 1) % testimonials.length);
  }

  function previousReview() {
    setActiveIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );
  }

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="customer-testimonials">
      {/* Left image */}
      <div className="customer-testimonials-image">
        <Image
          src="/testimonial-main.jpg"
          alt="Customer fashion collection"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 50vw"
        />
      </div>

      {/* Right content */}
      <div className="customer-testimonials-content">
        <span className="customer-testimonials-quote">”</span>

        <div className="customer-testimonials-heading">
          <h2>What Customers Say</h2>
          <p>Showing our latest arrival on this summer</p>
        </div>

        <div key={active.id} className="customer-testimonials-review">
          <h3>{active.name}</h3>
          <p className="customer-testimonials-role">{active.role}</p>

          <p className="customer-testimonials-description">
            {active.review}
          </p>

          <div className="customer-testimonials-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= active.rating ? "star-active" : ""}
              >
                ☆
              </span>
            ))}
          </div>
        </div>

        <div className="customer-testimonials-bottom">
          <div className="customer-testimonials-avatars">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`customer-testimonials-avatar ${
                  index === activeIndex ? "selected" : ""
                }`}
                aria-label={`Read review from ${item.name}`}
              >
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  sizes="76px"
                />
              </button>
            ))}
          </div>

          <div className="customer-testimonials-arrows">
            <button
              type="button"
              onClick={previousReview}
              aria-label="Previous review"
            >
              ↙
            </button>

            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
            >
              ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}