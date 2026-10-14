import getBeautyBanner from "../../utilities/getBeautyBanner";
import getBeautyCategories from "../../utilities/getBeautyCategories";

import BeautyBanner from "../../components/ui/BeautyBanner";
import BeautyCategories from "../../components/ui/BeautyCategories";
import BeautyProducts from "../../components/ui/BeautyProducts";




export default async function BeautyPage() {
  let banner = null;
  let categories = [];

  try {
    banner = await getBeautyBanner();
  } catch (error) {
    console.error("Beauty Banner Error:", error);
  }

  try {
    const result = await getBeautyCategories();

    // API response থেকে category array বের করা
    if (Array.isArray(result)) {
      categories = result;
    } else if (Array.isArray(result?.data)) {
      categories = result.data;
    } else if (Array.isArray(result?.categories)) {
      categories = result.categories;
    } else {
      console.error("Unexpected Beauty Categories Response:", result);
    }
  } catch (error) {
    console.error("Beauty Categories Error:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      {banner && <BeautyBanner banner={banner} />}

      <BeautyCategories categories={categories} />

      <BeautyProducts />
    </main>
  );
}