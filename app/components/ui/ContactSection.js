"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message form is ready. Connect your backend API to send it.");
  };

  return (
    <main className="contact-page bg-white text-[#071525]">
      {/* Page Title */}
      <section className="px-4 pb-12 pt-2 text-center sm:pb-16">
        <h1 className="text-3xl font-medium sm:text-4xl">
          Keep In Touch With Us
        </h1>

        <div className="mt-7 flex items-center justify-center gap-4 text-sm">
          <a href="/" className="transition hover:text-orange-500">
            Home
          </a>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">Contact</span>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 bg-white px-5 py-8 shadow-[0_0_60px_rgba(0,0,0,0.045)] sm:px-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-24 lg:px-[70px] lg:py-12">
          {/* Form */}
          <div>
            <h2 className="mb-7 text-2xl font-semibold">
              Sent A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="h-16 w-full border border-[#dedede] bg-white px-5 text-sm text-[#071525] outline-none placeholder:text-[#526071] focus:border-[#071525]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="h-16 w-full border border-[#dedede] bg-white px-5 text-sm text-[#071525] outline-none placeholder:text-[#526071] focus:border-[#071525]"
              />

              <div className="relative">
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="h-16 w-full appearance-none border border-[#dedede] bg-white px-5 pr-12 text-sm text-[#526071] outline-none focus:border-[#071525]"
                >
                  <option value="" disabled>
                    Subject
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Other">Other</option>
                </select>

                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#81869c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m4 9 8 8 8-8" />
                </svg>
              </div>

              <textarea
                name="message"
                placeholder="Type your message"
                value={form.message}
                onChange={handleChange}
                required
                rows={7}
                className="min-h-[208px] w-full resize-y border border-[#dedede] bg-white px-5 py-6 text-sm text-[#071525] outline-none placeholder:text-[#526071] focus:border-[#071525]"
              />

              <label className="flex cursor-pointer items-start gap-2 text-sm leading-6 text-[#526071]">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={form.saveInfo}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#071525]"
                />

                <span>
                  Save My Name, Email, And Website In This Browser For The
                  Next Time I Comment.
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex min-h-10 items-center justify-center border border-[#071525] bg-[#071525] px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Post Comment
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <aside className="flex flex-col gap-9 lg:pt-12">
            {/* Email */}
            <div>
              <svg
                className="mb-4 h-12 w-12"
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M5 25C5 13 14 6 25 6s20 8 20 19-9 19-20 19c-4 0-8-1-11-3l-9 3 3-9c-2-3-3-6-3-10Z" />
                <path d="M38 35c4 7 10 10 17 10l-3-7c3-3 4-6 4-10 0-6-4-11-10-13" />
              </svg>

              <h3 className="break-words text-base font-semibold">
                Contact@Support.Com
              </h3>
            </div>

            {/* Address */}
            <div>
              <svg
                className="mb-4 h-12 w-12"
                viewBox="0 0 48 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M24 3C13 3 5 12 5 23c0 13 19 33 19 33s19-20 19-33C43 12 35 3 24 3Z" />
              </svg>

              <h3 className="text-base font-semibold leading-6">
                84 Sleepy Hollow St.
                <br />
                Jamaica, New York 1432
              </h3>
            </div>

            {/* Social */}
            <div>
              <svg
                className="mb-4 h-12 w-12"
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <circle cx="12" cy="30" r="7" />
                <circle cx="43" cy="12" r="7" />
                <circle cx="43" cy="48" r="7" />
                <path d="M18 27 37 15M18 33l19 12" />
              </svg>

              <h3 className="mb-3 text-base font-semibold">
                Find On Social Media
              </h3>

              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-[38px] w-[38px] items-center justify-center border border-[#dedede] font-bold transition hover:bg-[#071525] hover:text-white"
                >
                  f
                </a>

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="flex h-[38px] w-[38px] items-center justify-center border border-[#dedede] font-bold transition hover:bg-[#071525] hover:text-white"
                >
                  𝕏
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-[38px] w-[38px] items-center justify-center border border-[#dedede] text-sm font-bold transition hover:bg-[#071525] hover:text-white"
                >
                  in
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}