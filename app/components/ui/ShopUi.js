"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CART_KEY = "cart";

function getProductId(item) {
  const id = item.id ?? item._id ?? item.productId;
  return id == null ? null : String(id);
}

function readCart() {
  try {
    const savedCart = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    if (!Array.isArray(savedCart)) return [];

    return savedCart
      .filter((item) => getProductId(item) !== null)
      .map((item) => ({
        ...item,
        id: getProductId(item),
        price: Number(item.price) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));
  } catch (error) {
    console.error("Cart read error:", error);
    return [];
  }
}

export default function ShopUI() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [coupon, setCoupon] = useState("");

  // Load cart once when the page opens
  useEffect(() => {
    setCart(readCart());
    setLoaded(true);
  }, []);

  // Save cart after React state changes
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));

      // Notify Navbar after saving the latest cart
      window.dispatchEvent(new Event("cart-count-updated"));
    } catch (error) {
      console.error("Cart save error:", error);
    }
  }, [cart, loaded]);

  // Increase or decrease quantity
  const updateQuantity = (id, amount) => {
    const productId = String(id);

    setCart((previousCart) =>
      previousCart.map((item) =>
        getProductId(item) === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                (Number(item.quantity) || 1) + amount
              ),
            }
          : item
      )
    );
  };

  // Remove product from cart
  const removeProduct = (id) => {
    const productId = String(id);

    setCart((previousCart) =>
      previousCart.filter(
        (item) => getProductId(item) !== productId
      )
    );
  };

  // Total product quantity
  const totalItems = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  // Total price
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );

  // Loading state
  if (!loaded) {
    return (
      <div className="py-20 text-center text-gray-600">
        Loading cart...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Page Heading */}
      <section className="border-b border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>

            <span className="mx-2">/</span>
            Shopping Cart
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {totalItems} item(s) in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600">
              Your shopping cart is empty.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block bg-black px-7 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="px-4 py-5 font-medium">
                      Remove
                    </th>
                    <th className="px-4 py-5 font-medium">
                      Product
                    </th>
                    <th className="px-4 py-5 font-medium">
                      Price
                    </th>
                    <th className="px-4 py-5 font-medium">
                      Quantity
                    </th>
                    <th className="px-4 py-5 font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => {
                    const id = getProductId(item);
                    const quantity = Number(item.quantity) || 1;
                    const price = Number(item.price) || 0;
                    const currency = item.currency || "৳";

                    return (
                      <tr
                        key={id}
                        className="border-b border-gray-200"
                      >
                        {/* Remove */}
                        <td className="px-4 py-5">
                          <button
                            type="button"
                            onClick={() => removeProduct(id)}
                            aria-label={`Remove ${item.name || "product"}`}
                            className="text-xl text-gray-500 hover:text-red-600"
                          >
                            ×
                          </button>
                        </td>

                        {/* Product */}
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-4">
                            {item.image ? (
                              <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image}
                                  alt={item.name || "Product"}
                                  fill
                                  sizes="64px"
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex h-20 w-16 shrink-0 items-center justify-center bg-gray-100 text-xs text-gray-400">
                                No image
                              </div>
                            )}

                            <span className="font-medium">
                              {item.name || "Product"}
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-5">
                          {currency}
                          {price.toFixed(2)}
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-5">
                          <div className="flex w-fit items-center border border-gray-300">
                            <button
                              type="button"
                              onClick={() => updateQuantity(id, -1)}
                              className="px-3 py-2 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span className="min-w-10 text-center">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(id, 1)}
                              className="px-3 py-2 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className="px-4 py-5 font-medium">
                          {currency}
                          {(price * quantity).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Coupon and Update Cart */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="Coupon code"
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black sm:max-w-xs"
              />

              <button
                type="button"
                onClick={() =>
                  alert("Coupon application needs coupon validation.")
                }
                className="bg-black px-7 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Apply Coupon
              </button>

              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.setItem(
                      CART_KEY,
                      JSON.stringify(cart)
                    );

                    window.dispatchEvent(
                      new Event("cart-count-updated")
                    );
                  } catch (error) {
                    console.error("Update cart error:", error);
                  }
                }}
                className="border border-gray-300 px-7 py-3 text-sm font-medium hover:bg-gray-50"
              >
                Update Cart
              </button>
            </div>

            {/* Cart Totals */}
            <div className="mt-12 flex justify-end">
              <div className="w-full border border-gray-200 p-6 sm:max-w-md sm:p-8">
                <h2 className="mb-6 text-xl font-semibold">
                  Cart Totals
                </h2>

                <div className="flex justify-between gap-4 border-b border-gray-200 py-4">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    {cart[0]?.currency || "৳"}
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-gray-200 py-4">
                  <span className="text-gray-600">
                    Shipping
                  </span>

                  <span className="text-right text-sm text-gray-500">
                    Calculated at checkout
                  </span>
                </div>

                <div className="flex justify-between gap-4 py-5 text-lg font-semibold">
                  <span>Total</span>

                  <span>
                    {cart[0]?.currency || "৳"}
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert("Checkout page has not been connected yet.")
                  }
                  className="w-full bg-black px-5 py-4 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
