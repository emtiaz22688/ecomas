const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

export default async function getBeautyProducts(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const url = query.toString() 
    ? `${API_URL}?${query.toString()}` 
    : API_URL;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Beauty Products API Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Beauty products data পাওয়া যায়নি");
    }

    // রেসপন্সের ভেতরের data array রিটার্ন করতে হবে
    return result.data; 
  } catch (error) {
    console.error("Beauty Products Error:", error);
    return [];
  }
}
