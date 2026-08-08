const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchBanner() {
  const response = await fetch(`${API_BASE_URL}/admin/banner/get`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load banner content");
  }

  const payload = await response.json();
  return payload.data;
}

export default {
  fetchBanner,
};
