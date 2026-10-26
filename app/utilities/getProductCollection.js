// ১ নম্বর লাইনে সরাসরি পুরো লিঙ্ক না দিয়ে এনভায়রনমেন্ট ভেরিয়েবল ব্যবহার করুন
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/product-collection`;

export async function getProductCollection() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product Collection API:", result);

    // Render-এর রেসপন্সে 'data' প্রোপার্টি আছে কি না তা নিশ্চিত করা
    if (!result || !Array.isArray(result.data)) {
      throw new Error("API response এর data array পাওয়া যায়নি");
    }

    return result.data;
  } catch (error) {
    console.error("Product Collection Fetch Error:", error);
    return [];
  }
}
