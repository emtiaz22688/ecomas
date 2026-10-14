const API_URL = "https://ecomas-server.onrender.com/api/categories";

export const getCategories = async () => {
    try {
        const response = await fetch(API_URL, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const result = await response.json();

        return result.data || [];
    } catch (error) {
        console.error("Categories API Error:", error);
        return [];
    }
};