import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function fetchContacts({ page = 1, limit = 8, search = "" } = {}) {
  const response = await api.get("/admin/contact/get");
  const contacts = response.data.data || [];

  const filtered = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(search.toLowerCase()) ||
    contact.message?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    data: filtered.slice((page - 1) * limit, page * limit),
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
}

export async function deleteContact(id) {
  const response = await api.delete(`/admin/contact/delete/${id}`);
  return response.data;
}

export default {
  fetchContacts,
  deleteContact,
};
