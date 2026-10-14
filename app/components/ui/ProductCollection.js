import Link from "next/link";
import { getProductCollection } from "../../utilities/getProductCollection";

export default async function ProductCollection() {
  const products = await getProductCollection();
  return (
   <section className="relative -mt-24 sm:-mt-28 w-full bg-white pt-4 pb-12 sm:pt-6 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 g:px-8">

        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-wide text-pink-500">
            Beauty Collection
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Our Product Collection
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Discover your favorite beauty products for your daily routine.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex h-full flex-col items-center border border-gray-200 bg-white px-5 py-7 text-center transition duration-300 hover:border-pink-200 hover:shadow-lg sm:px-7 sm:py-9"
              >
                <div className="mb-5 flex h-36 w-full items-center justify-center sm:h-40">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mb-3 max-w-sm text-lg font-medium leading-7 text-gray-900 sm:text-xl">
                  {product.name}
                </h3>

                <p className="mb-4 max-w-sm text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                <p className="mt-auto text-lg font-medium text-pink-500">
                  Save ${product.save}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-base text-gray-500">
              No products available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}