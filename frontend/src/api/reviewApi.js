const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function fetchReviews() {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load reviews");
  }

  const payload = await response.json();
  return payload.data || [];
}

export default {
  fetchReviews,
};
