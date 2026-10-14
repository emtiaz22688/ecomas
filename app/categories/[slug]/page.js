const categories = {
  women: {
    name: "Women",
    subcategories: [
      { name: "Saree", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600" },
      { name: "Tops", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" },
      { name: "Dress", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" },
      { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600" },
    ],
  },
  men: {
    name: "Men",
    subcategories: [
      { name: "Shirt", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600" },
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
      { name: "Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600" },
      { name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600" },
    ],
  },
  accessories: {
    name: "Accessories",
    subcategories: [
      { name: "Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
      { name: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600" },
      { name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
      { name: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600" },
    ],
  },
  baby: {
    name: "Baby",
    subcategories: [
      { name: "Baby Dress", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600" },
      { name: "Toys", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600" },
      { name: "Shoes", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600" },
      { name: "Accessories", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600" },
    ],
  },
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
    return <h1 className="p-10 text-2xl">Category not found</h1>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">{category.name}</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {category.subcategories.map((item) => (
          <div
            key={item.name}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-56 overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explore Collection
              </p>

              <button
                type="button"
                className="mt-4 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}