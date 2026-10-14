"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const themes = [
  {
    id: "purple",
    name: "Purple",
    color: "#8b5cf6",
    darkBg: "#171329",
    darkSurface: "#211b3a",
    darkHover: "#30264d",
  },
  {
    id: "blue",
    name: "Blue",
    color: "#3b82f6",
    darkBg: "#101c30",
    darkSurface: "#192943",
    darkHover: "#233957",
  },
  {
    id: "green",
    name: "Green",
    color: "#10b981",
    darkBg: "#10231f",
    darkSurface: "#19332c",
    darkHover: "#24473c",
  },
  {
    id: "rose",
    name: "Rose",
    color: "#ec4899",
    darkBg: "#281521",
    darkSurface: "#3a1d2d",
    darkHover: "#51253d",
  },
  {
    id: "orange",
    name: "Orange",
    color: "#f97316",
    darkBg: "#291b12",
    darkSurface: "#3a281b",
    darkHover: "#523823",
  },
  {
    id: "cyan",
    name: "Cyan",
    color: "#06b6d4",
    darkBg: "#10252b",
    darkSurface: "#19343d",
    darkHover: "#234752",
  },
];

const animatedColors = [
  "#8b5cf6",
  "#ec4899",
  "#3b82f6",
  "#10b981",
  "#f97316",
  "#06b6d4",
  "#6366f1",
];

export default function Navber() {
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [selectedTheme, setSelectedTheme] = useState("rose");

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedColorIndex, setAnimatedColorIndex] = useState(0);

  // Load saved settings
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedColor = localStorage.getItem("themeColor");
    const savedLanguage = localStorage.getItem("language");
    const savedCurrency = localStorage.getItem("currency");

    setDarkMode(savedTheme === "dark");

    if (themes.some((theme) => theme.id === savedColor)) {
      setSelectedTheme(savedColor);
    }

    if (savedLanguage === "en" || savedLanguage === "bn") {
      setLanguage(savedLanguage);
    }

    if (savedCurrency === "USD" || savedCurrency === "BDT") {
      setCurrency(savedCurrency);
    }

    setMounted(true);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animated navbar color on scroll
  useEffect(() => {
    if (!isScrolled) {
      setAnimatedColorIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setAnimatedColorIndex((current) => {
        return (current + 1) % animatedColors.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isScrolled]);

  // Cart count update
  useEffect(() => {
    const updateCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (Array.isArray(cart)) {
          setCartCount(
            cart.reduce(
              (total, item) =>
                total + Math.max(0, Number(item.quantity) || 1),
              0
            )
          );
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    };

    updateCart();

    window.addEventListener("storage", updateCart);
    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("cart-count-updated", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("cart-count-updated", updateCart);
    };
  }, []);

  const activeTheme =
    themes.find((theme) => theme.id === selectedTheme) || themes[3];

  const activeColor = activeTheme.color;

  const navbarAccent = isScrolled
    ? animatedColors[animatedColorIndex]
    : activeColor;

  // Apply global theme
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    const background = darkMode ? activeTheme.darkBg : "#ffffff";
    const surface = darkMode ? activeTheme.darkSurface : "#ffffff";
    const hover = darkMode ? activeTheme.darkHover : "#fdf2f8";
    const textColor = darkMode ? "#f9fafb" : "#071522";
    const muted = darkMode ? "#d1d5db" : "#4b5563";
    const border = darkMode ? activeTheme.darkHover : "#f3f4f6";

    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";

    root.style.setProperty("--theme-accent", activeColor);
    root.style.setProperty("--theme-bg", background);
    root.style.setProperty("--theme-surface", surface);
    root.style.setProperty("--theme-hover", hover);
    root.style.setProperty("--theme-text", textColor);
    root.style.setProperty("--theme-muted", muted);
    root.style.setProperty("--theme-border", border);

    body.style.backgroundColor = background;
    body.style.color = textColor;

    localStorage.setItem("theme", darkMode ? "dark" : "light");
    localStorage.setItem("themeColor", selectedTheme);
    localStorage.setItem("language", language);
    localStorage.setItem("currency", currency);
  }, [
    mounted,
    darkMode,
    selectedTheme,
    language,
    currency,
    activeColor,
    activeTheme,
  ]);

  const t =
    language === "bn"
      ? {
          followers: "৭৫০০কে ফলোয়ার",
          home: "হোম",
          pages: "পেজসমূহ",
          shop: "শপ",
          blog: "ব্লগ",
          contact: "যোগাযোগ",
          login: "লগইন",
          about: "আমাদের সম্পর্কে",
          account: "আমার অ্যাকাউন্ট",
          products: "সকল পণ্য",
          beauty: "বিউটি",
          latestPosts: "সর্বশেষ পোস্ট",
          beautyTips: "বিউটি টিপস",
          fashionNews: "ফ্যাশন নিউজ",
          themeColor: "থিমের রং",
          chooseColor: "রং নির্বাচন করুন",
          dark: "ডার্ক মোড",
          light: "লাইট মোড",
        }
      : {
          followers: "7500k Followers",
          home: "Home",
          pages: "Pages",
          shop: "Shop",
          blog: "Blog",
          contact: "Contact Us",
          login: "Log In",
          about: "About Us",
          account: "My Account",
          products: "All Products",
          beauty: "Beauty",
          latestPosts: "Latest Posts",
          beautyTips: "Beauty Tips",
          fashionNews: "Fashion News",
          themeColor: "Theme Color",
          chooseColor: "Choose a color",
          dark: "Dark Mode",
          light: "Light Mode",
        };

  const dropdownBackground =
    "border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)]";

  const dropdownItem =
    "block w-full px-5 py-3 text-left text-sm text-[var(--theme-text)] transition hover:bg-[var(--theme-hover)]";

  // Home has no dropdown.
  // FAQ removed from Pages.
  // New Arrivals and Accessories removed from Shop.
  const menus = [
    {
      label: t.pages,
      href: "/about",
      items: [
        [t.about, "/about"],
        [t.contact, "/contact"],
        [t.account, "/account"],
      ],
    },
    {
      label: t.shop,
      href: "/shop",
      items: [
        [t.products, "/shop"],
        [t.beauty, "/shop/beauty"],
      ],
    },
    {
      label: t.blog,
      href: "/blog",
      items: [
        [t.latestPosts, "/blog"],
        [t.beautyTips, "/blog/beauty-tips"],
        [t.fashionNews, "/blog/fashion-news"],
      ],
    },
  ];

  return (
    <>
      {/* FIXED HEADER AND NAVBAR */}
      <div
        className="fixed inset-x-0 top-0 z-[1000] w-full"
        style={{
          "--theme-accent": navbarAccent,
          "--theme-bg": darkMode ? activeTheme.darkBg : "#ffffff",
          "--theme-surface": darkMode
            ? activeTheme.darkSurface
            : "#ffffff",
          "--theme-hover": darkMode
            ? activeTheme.darkHover
            : "#fdf2f8",
          "--theme-text": darkMode ? "#f9fafb" : "#071522",
          "--theme-muted": darkMode ? "#d1d5db" : "#4b5563",
          "--theme-border": darkMode
            ? activeTheme.darkHover
            : "#f3f4f6",
        }}
      >
        {/* TOP HEADER */}
        <header
          className="relative z-30 text-white transition-colors duration-1000"
          style={{
            backgroundColor: darkMode
              ? activeTheme.darkBg
              : "#03111c",
          }}
        >
          <div className="mx-auto flex min-h-[46px] max-w-[1660px] items-center justify-between gap-2 px-3 sm:px-5 md:px-10 lg:px-12">
            <div className="flex items-center gap-2 text-[11px] sm:gap-5 sm:text-[13px]">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 sm:gap-2"
              >
                <span
                  className="text-lg font-bold"
                  style={{ color: navbarAccent }}
                >
                  f
                </span>
                <span>{t.followers}</span>
              </a>

              <span className="hidden h-6 w-px bg-white/15 sm:block" />

              <a
                href="tel:+40276328246"
                className="hidden items-center gap-2 sm:flex"
              >
                <span style={{ color: navbarAccent }}>☎</span>
                <span>+402 763 282 46</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] sm:gap-4 sm:text-[13px]">
              {/* LANGUAGE */}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 py-3"
                >
                  {language === "en" ? "English" : "বাংলা"} <span>⌄</span>
                </button>

                <div
                  className={`invisible absolute right-0 top-full z-[1100] min-w-[120px] border-t-2 py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 ${dropdownBackground}`}
                  style={{ borderColor: navbarAccent }}
                >
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={dropdownItem}
                  >
                    English
                  </button>

                  <button
                    type="button"
                    onClick={() => setLanguage("bn")}
                    className={dropdownItem}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              {/* CURRENCY */}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 py-3"
                >
                  {currency === "USD" ? "$USD" : "৳BDT"} <span>⌄</span>
                </button>

                <div
                  className={`invisible absolute right-0 top-full z-[1100] min-w-[110px] border-t-2 py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 ${dropdownBackground}`}
                  style={{ borderColor: navbarAccent }}
                >
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={dropdownItem}
                  >
                    USD ($)
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrency("BDT")}
                    className={dropdownItem}
                  >
                    BDT (৳)
                  </button>
                </div>
              </div>

              {/* THEME COLOR */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setThemeMenuOpen((open) => !open)}
                  className="flex items-center gap-1 whitespace-nowrap sm:gap-2"
                  aria-expanded={themeMenuOpen}
                >
                  <span
                    className="h-3 w-3 rounded-full ring-2 ring-white/30 transition-colors duration-1000"
                    style={{ backgroundColor: navbarAccent }}
                  />

                  <span className="hidden sm:inline">{t.themeColor}</span>
                  <span>⌄</span>
                </button>

                {themeMenuOpen && (
                  <div
                    className={`absolute right-0 top-full z-[1200] mt-2 w-52 rounded-xl border p-4 shadow-xl ${dropdownBackground}`}
                  >
                    <p className="mb-3 text-sm font-semibold">
                      {t.chooseColor}
                    </p>

                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          setSelectedTheme(theme.id);
                          setThemeMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-[var(--theme-hover)]"
                      >
                        <span
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: theme.color }}
                        />

                        {theme.name}
                        {selectedTheme === theme.id && " ✓"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DARK / LIGHT MODE */}
              <button
                type="button"
                onClick={() => setDarkMode((previous) => !previous)}
                className="flex items-center gap-2 whitespace-nowrap"
                aria-pressed={darkMode}
              >
                <span
                  className="relative inline-flex h-[22px] w-[40px] items-center rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor: darkMode ? navbarAccent : "#e5e7eb",
                  }}
                >
                  <span
                    className={`absolute h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
                      darkMode ? "left-5" : "left-1"
                    }`}
                  />
                </span>

                <span className="hidden sm:inline">
                  {darkMode ? t.dark : t.light}
                </span>
              </button>

              {/* LOGIN */}
              <Link
                href="/login"
                className="flex items-center gap-1 whitespace-nowrap sm:gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
                </svg>

                <span>{t.login}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN NAVBAR */}
        <nav
          className="relative z-20 border-b transition-colors duration-1000"
          style={{
            backgroundColor: isScrolled
              ? navbarAccent
              : darkMode
                ? activeTheme.darkSurface
                : "#ffffff",
            color: isScrolled
              ? "#ffffff"
              : darkMode
                ? "#f9fafb"
                : "#071522",
            borderColor: isScrolled
              ? navbarAccent
              : darkMode
                ? activeTheme.darkHover
                : "#f3f4f6",
          }}
        >
          <div className="mx-auto flex min-h-[72px] max-w-[1660px] items-center justify-between gap-2 px-3 sm:px-5 md:px-10 lg:px-12">
            {/* LOGO */}
            <Link href="/" className="flex shrink-0 items-center gap-1">
              <svg width="34" height="38" viewBox="0 0 34 38" fill="none">
                <path
                  d="M6 11V7a6 6 0 0 1 12 0v4"
                  stroke={isScrolled ? "#ffffff" : activeColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <rect
                  x="3"
                  y="11"
                  width="25"
                  height="24"
                  rx="3"
                  stroke={isScrolled ? "#ffffff" : activeColor}
                  strokeWidth="2.5"
                />

                <path
                  d="m8 18 7 6 7-6"
                  stroke={isScrolled ? "#ffffff" : activeColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[23px] font-bold tracking-[-1.5px] sm:text-[27px]">
                ecomas
              </span>
            </Link>

            {/* MOBILE MENU */}
            <div className="relative lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-md text-2xl hover:opacity-70"
              >
                ☰
              </button>

              {mobileMenuOpen && (
                <div
                  className={`absolute left-0 top-full z-[1100] mt-2 min-w-[190px] border py-2 shadow-xl ${dropdownBackground}`}
                  style={{ borderColor: navbarAccent }}
                >
                  {/* Home: direct route */}
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.home}
                  </Link>

                  {/* Pages */}
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.about}
                  </Link>

                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.account}
                  </Link>

                  {/* Shop */}
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.products}
                  </Link>

                  <Link
                    href="/shop/beauty"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.beauty}
                  </Link>

                  {/* Blog */}
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.blog}
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={dropdownItem}
                  >
                    {t.contact}
                  </Link>
                </div>
              )}
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden items-center gap-7 lg:flex xl:gap-9">
              {/* HOME: no dropdown */}
              <Link
                href="/"
                className="py-6 text-[14px] transition-opacity duration-300 hover:opacity-70"
              >
                {t.home}
              </Link>

              {/* PAGES, SHOP AND BLOG: dropdowns */}
              {menus.map((menu) => (
                <div key={menu.label} className="group relative">
                  <Link
                    href={menu.href}
                    className="flex items-center gap-2 py-6 text-[14px] transition-opacity duration-300 hover:opacity-70"
                  >
                    {menu.label}
                    <span className="text-xs">⌄</span>
                  </Link>

                  <div
                    className={`invisible absolute left-0 top-full z-[1100] min-w-[190px] border-t-2 py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 ${dropdownBackground}`}
                    style={{ borderColor: navbarAccent }}
                  >
                    {menu.items.map(([label, href]) => (
                      <Link
                        key={`${label}-${href}`}
                        href={href}
                        className={dropdownItem}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* CONTACT */}
              <Link
                href="/contact"
                className="py-6 text-[14px] transition-opacity duration-300 hover:opacity-70"
              >
                {t.contact}
              </Link>
            </div>

            {/* SEARCH, WISHLIST, CART */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <Link
                href="/search"
                aria-label="Search"
                className="hover:opacity-70"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16 16 4.5 4.5" />
                </svg>
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative hover:opacity-70"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>

                <span
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white"
                  style={{
                    backgroundColor: isScrolled ? "#03111c" : activeColor,
                  }}
                >
                  0
                </span>
              </Link>

              <Link
                href="/shop"
                aria-label="Shopping Cart"
                className="relative hover:opacity-70"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
                  <circle cx="10" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                </svg>

                <span
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white"
                  style={{
                    backgroundColor: isScrolled ? "#03111c" : activeColor,
                  }}
                >
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer for fixed navbar */}
      <div aria-hidden="true" className="h-[118px] w-full" />
    </>
  );
}