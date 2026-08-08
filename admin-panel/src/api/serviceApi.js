import api from "./api";

export async function fetchServices() {
  const response = await api.get("/admin/service/getService");
  return response.data;
}

export async function createService(data) {
  const response = await api.post("/admin/service/create", data);
  return response.data;
}

export async function updateService(id, data) {
  const response = await api.put(`/admin/service/update/${id}`, data);
  return response.data;
}

export async function deleteService(id) {
  const response = await api.delete(`/admin/service/delete/${id}`);
  return response.data;
}

export default {
  fetchServices,
  createService,
  updateService,
  deleteService,
};
