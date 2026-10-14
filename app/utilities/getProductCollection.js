const API_URL = "https://ecomas-server.onrender.com/api/product-collection";

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

        if (!Array.isArray(result.data)) {
            throw new Error("API response-এর data array পাওয়া যায়নি");
        }

        return result.data;
    } catch (error) {
        console.error("Product Collection Fetch Error:", error);
        return [];
    }
}