const API_URL = "https://ecomas-server.onrender.com/api/products";

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

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Beauty Products API Error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Beauty products data পাওয়া যায়নি।");
  }

  return result;
}