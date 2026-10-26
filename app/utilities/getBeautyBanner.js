const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/beauty/banner`;

export default async function getBeautyBanner() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Beauty banner API failed:", response.status);
      return null;
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching Beauty Banner:", error);
    return null;
  }
}
