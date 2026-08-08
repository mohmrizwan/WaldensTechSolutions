const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendContact(payload) {
  const response = await fetch(`${API_BASE_URL}/contact/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    const message = errorPayload?.message || "Failed to send contact message";
    throw new Error(message);
  }

  return response.json();
}

export default {
  sendContact,
};
