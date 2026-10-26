// ১ নম্বর লাইনে লোকালহোস্ট কেটে এনভায়রনমেন্ট ভেরিয়েবল বসানো হলো
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/beauty/categories`;

export default async function getBeautyCategories() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Categories API Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Beauty categories data পাওয়া যায়নি");
    }

    return result.data;
  } catch (error) {
    console.error("Beauty Categories Error:", error);
    return [];
  }
}
