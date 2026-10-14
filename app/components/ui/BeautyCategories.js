import Link from "next/link";

export default function BeautyCategories({ categories = [] }) {
  const categoryList = Array.isArray(categories) ? categories : [];

  if (categoryList.length === 0) {
    return (
      <section className="px-4 py-10 text-center">
        <p className="text-gray-500 dark:text-gray-300">
          কোনো Beauty Category পাওয়া যায়নি।
        </p>
      </section>
    );
  }

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
            Explore Beauty
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-300 sm:text-base">
            Discover skincare, makeup and your everyday beauty essentials.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-7">
          {categoryList.map((category, index) => {
            const categoryName =
              typeof category === "string"
                ? category
                : typeof category?.name === "string"
                  ? category.name
                  : typeof category?.title === "string"
                    ? category.title
                    : typeof category?.label === "string"
                      ? category.label
                      : null;

            if (!categoryName) {
              console.error("Invalid Beauty Category:", category);
              return null;
            }

            const categoryId =
              category?.id ?? category?._id ?? `${categoryName}-${index}`;

            return (
              <Link
                key={categoryId}
                href={`/shop/beauty?category=${encodeURIComponent(categoryName)}`}
                className="group flex min-h-28 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:bg-pink-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-pink-400 dark:hover:bg-gray-700 sm:min-h-32 sm:p-5"
              >
                <div>
                 <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-2xl font-bold leading-none transition group-hover:bg-pink-200 dark:bg-pink-200 dark:group-hover:bg-pink-300">
  <span
    aria-hidden="true"
    className="beauty-category-heart"
    style={{ color: "#be185d" }}
  >
    ♡
  </span>
</div>
                  <h3 className="text-sm font-semibold text-gray-800 transition group-hover:text-pink-600 dark:text-white dark:group-hover:text-pink-300 sm:text-base">
                    {categoryName}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                    Explore →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}