const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function fetchServices() {
  const response = await fetch(`${API_BASE_URL}/service/get`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load services");
  }

  const payload = await response.json();
  return payload.data || [];
}

export default {
  fetchServices,
};
