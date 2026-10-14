
import getProducts from "../../utilities/getProducts";
import AddToCartButton from "./AddToCartButton";

export default async function Products() {
  const products = await getProducts();

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
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

        {/* Product Grid */}
        {!Array.isArray(products) || products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="mb-4 flex h-52 items-center justify-center overflow-hidden">
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

                {/* Product Information */}
                <div className="flex flex-1 flex-col text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.brand} · {product.category}
                  </p>

                  <div className="mt-4">
                    <p className="text-lg font-semibold text-pink-500">
                      {product.price} {product.currency}
                    </p>

                    {product.oldPrice != null && (
                      <p className="mt-1 text-sm text-gray-400 line-through">
                        {product.oldPrice} {product.currency}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-auto pt-5">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
