
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import getBeautyProducts from "../../utilities/getBeautyProducts";

const categories = [
  "All Beauty",
  "Skincare",
  "Makeup",
  "Hair Care",
  "Fragrance",
  "Body Care",
  "Tools & Accessories",
];

const CART_KEY = "cart";

function getProductId(product) {
  const id = product?.id ?? product?._id ?? product?.productId;
  return id == null ? null : String(id);
}

export default function BeautyProducts() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const limit = 8;

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingProduct, setAddingProduct] = useState(null);

  // Load products from API
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const result = await getBeautyProducts({
          search,
          category,
          brand,
          maxPrice,
          minRating,
          sort,
          page,
          limit,
        });

        if (cancelled) return;

        const productData = Array.isArray(result?.data)
          ? result.data
          : [];

        setProducts(productData);
        setTotal(result?.total ?? productData.length);
        setTotalPages(result?.totalPages ?? 1);
      } catch (err) {
        if (!cancelled) {
          console.error("Beauty Products Error:", err);
          setError(
            "Products load করা যায়নি। Backend API পরীক্ষা করো।"
          );
          setProducts([]);
          setTotal(0);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [search, category, brand, maxPrice, minRating, sort, page]);

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean))],
    [products]
  );

  function changeCategory(value) {
    setCategory(value === "All Beauty" ? "" : value);
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setBrand("");
    setMaxPrice(100);
    setMinRating(0);
    setSort("featured");
    setPage(1);
  }

  // Add product to cart and navigate to /shop
  function handleAddToCart(product) {
    try {
      const productId = getProductId(product);

      if (productId === null) {
        alert("এই product-এর ID পাওয়া যায়নি।");
        console.error("Product has no ID:", product);
        return;
      }

      setAddingProduct(productId);

      const savedCart = localStorage.getItem(CART_KEY);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      const cart = Array.isArray(parsedCart) ? [...parsedCart] : [];

      const existingIndex = cart.findIndex(
        (item) => getProductId(item) === productId
      );

      if (existingIndex !== -1) {
        cart[existingIndex] = {
          ...cart[existingIndex],
          id: productId,
          quantity: Math.max(
            1,
            Number(cart[existingIndex].quantity) || 1
          ) + 1,
        };
      } else {
        cart.push({
          ...product,
          id: productId,
          quantity: 1,
        });
      }

      // Save before opening the Shop page
      localStorage.setItem(CART_KEY, JSON.stringify(cart));

      // Notify the Navbar and other cart components
      window.dispatchEvent(new Event("cart-updated"));
      window.dispatchEvent(new Event("cart-count-updated"));

      // Open the shopping cart page
      router.push("/shop");
    } catch (err) {
      console.error("Add to Cart Error:", err);
      alert("Cart-এ product যোগ করা যায়নি। আবার চেষ্টা করো।");
      setAddingProduct(null);
    }
  }

  return (
    <section
      id="beauty-products"
      className="w-full bg-gray-50 px-3 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            Beauty Collection
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Discover Beauty Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Showing {total} products
          </p>
        </div>

        {/* Category buttons */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => {
            const active =
              (item === "All Beauty" && !category) ||
              category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => changeCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-pink-600 bg-pink-600 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-pink-400 hover:text-pink-600"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Filters */}
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-5 flex items-center justify-between gap-2">
              <h3 className="font-bold text-gray-900">
                Filter Products
              </h3>

              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-pink-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="border-b border-gray-100 pb-5">
              <h4 className="mb-3 text-sm font-semibold">
                Categories
              </h4>

              <div className="space-y-3">
                {categories.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                  >
                    <input
                      type="radio"
                      name="beauty-category"
                      checked={
                        item === "All Beauty"
                          ? !category
                          : category === item
                      }
                      onChange={() => changeCategory(item)}
                      className="accent-pink-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-100 py-5">
              <div className="mb-3 flex justify-between gap-2 text-sm font-semibold">
                <h4>Maximum Price</h4>
                <span>${maxPrice}</span>
              </div>

              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-pink-600"
              />

              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>$5</span>
                <span>$100</span>
              </div>
            </div>

            <div className="border-b border-gray-100 py-5">
              <h4 className="mb-3 text-sm font-semibold">Brand</h4>

              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-500"
              >
                <option value="">All Brands</option>
                {brands.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-5">
              <h4 className="mb-3 text-sm font-semibold">
                Minimum Rating
              </h4>

              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <label
                  key={rating}
                  className="mb-3 flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                >
                  <input
                    type="radio"
                    name="beauty-rating"
                    checked={minRating === rating}
                    onChange={() => {
                      setMinRating(rating);
                      setPage(1);
                    }}
                    className="accent-pink-600"
                  />
                  {rating === 0 ? "All ratings" : `${rating}+ stars`}
                </label>
              ))}
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search beauty products..."
                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-500"
              />

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-pink-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl border border-gray-200 bg-white p-3"
                  >
                    <div className="aspect-square rounded-lg bg-gray-200" />
                    <div className="mt-4 h-4 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                    <div className="mt-4 h-9 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
              >
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <h3 className="font-semibold text-gray-800">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                  const productId = getProductId(product);

                  return (
                    <article
                      key={productId ?? product.name}
                      className="group min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-3"
                    >
                      <div className="relative overflow-hidden rounded-lg bg-pink-50">
                        {product.discount ? (
                          <span className="absolute left-2 top-2 z-10 rounded bg-pink-600 px-2 py-1 text-[10px] font-bold text-white">
                            -{product.discount}%
                          </span>
                        ) : null}

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name || "Beauty product"}
                            loading="lazy"
                            className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex aspect-square items-center justify-center text-sm text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="pt-3">
                        <p className="truncate text-[11px] text-gray-500">
                          {product.category || "Beauty"}
                        </p>

                        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-gray-800">
                          {product.name}
                        </h3>

                        {product.brand && (
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {product.brand}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-amber-500">
                          ★ {Number(product.rating ?? 0).toFixed(1)}
                          <span className="ml-1 text-gray-400">
                            ({product.reviews ?? 0})
                          </span>
                        </p>

                        <div className="mt-2 flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {product.currency || "USD"}{" "}
                            {Number(product.price ?? 0).toFixed(2)}
                          </span>

                          {product.oldPrice != null && (
                            <span className="text-xs text-gray-400 line-through">
                              {product.currency || "USD"}{" "}
                              {Number(product.oldPrice).toFixed(2)}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          disabled={
                            addingProduct !== null ||
                            productId === null
                          }
                          onClick={() => handleAddToCart(product)}
                          className="mt-3 w-full rounded-lg bg-pink-600 px-2 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 disabled:cursor-wait disabled:opacity-60 sm:text-sm"
                        >
                          {String(addingProduct) === String(productId)
                            ? "Adding..."
                            : "♡ Add to Cart"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading && !error && totalPages > 1 && (
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-40"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (n) =>
                      n === 1 ||
                      n === totalPages ||
                      Math.abs(n - page) <= 1
                  )
                  .map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setPage(n)}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        n === page
                          ? "bg-pink-600 text-white"
                          : "border border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-40"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
