"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CART_KEY = "cart";

function getProductId(product) {
  const id = product.id ?? product._id ?? product.productId;
  return id == null ? null : String(id);
}

function getSavedCart() {
  try {
    const savedCart = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    if (!Array.isArray(savedCart)) {
      return [];
    }

    return savedCart.filter(
      (item) => getProductId(item) !== null
    );
  } catch (error) {
    console.error("Cart read error:", error);
    return [];
  }
}

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);

  // API থেকে products load
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products",
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Products fetch failed");
        }

        const result = await response.json();

        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        if (isMounted) {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Products fetch error:", error);

        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Add to Cart
  const handleAddToCart = (product) => {
    const productId = getProductId(product);

    if (productId === null) {
      console.error("Product ID পাওয়া যায়নি:", product);
      alert("এই product-এর ID পাওয়া যায়নি। API data পরীক্ষা করো।");
      return;
    }

    if (addingProductId !== null) {
      return;
    }

    setAddingProductId(productId);

    try {
      // প্রতিবার click-এ সর্বশেষ cart পড়বে
      const currentCart = getSavedCart();

      const existingIndex = currentCart.findIndex(
        (item) => getProductId(item) === productId
      );

      let updatedCart;

      if (existingIndex !== -1) {
        // একই product থাকলে quantity বাড়বে
        updatedCart = currentCart.map((item, index) =>
          index === existingIndex
            ? {
              ...item,
              id: productId,
              name: product.name || item.name || "Product",
              image: product.image || item.image || "",
              price: Number(product.price ?? item.price) || 0,
              currency:
                product.currency || item.currency || "৳",
              quantity: (Number(item.quantity) || 1) + 1,
            }
            : item
        );
      } else {
        // নতুন product হলে আলাদা item হিসেবে যোগ হবে
        updatedCart = [
          ...currentCart,
          {
            id: productId,
            name: product.name || "Product",
            image: product.image || "",
            price: Number(product.price) || 0,
            currency: product.currency || "৳",
            quantity: 1,
          },
        ];
      }

      // আগে save, তারপর event, তারপর navigation
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("cart-updated"));

      router.push("/shop");
    } catch (error) {
      console.error("Add to Cart error:", error);
      alert("Cart-এ product যোগ করা যায়নি। আবার চেষ্টা করো।");
      setAddingProductId(null);
    }
  };

  if (loading) {
    return (
      <section className="py-12 text-center text-gray-500">
        Loading products...
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium text-pink-500">
            Our Collection
          </p>

          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Our Product Collection
          </h2>

          <p className="mt-4 text-gray-500">
            Discover your favorite products for your daily routine.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => {
              const productId = getProductId(product);

              return (
                <div
                  key={productId ?? index}
                  className="flex flex-col border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-52 items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name || "Product"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {product.brand} · {product.category}
                    </p>

                    <div className="mt-4">
                      <p className="text-lg font-semibold text-pink-500">
                        {product.currency || "৳"}{" "}
                        {product.price}
                      </p>

                      {product.oldPrice != null && (
                        <p className="mt-1 text-sm text-gray-400 line-through">
                          {product.currency || "৳"}{" "}
                          {product.oldPrice}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      disabled={
                        productId === null ||
                        addingProductId !== null
                      }
                      className="mt-5 block w-full bg-pink-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {addingProductId === productId
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}