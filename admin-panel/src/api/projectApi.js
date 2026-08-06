import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function fetchProjects({ page = 1, limit = 8, search = "" } = {}) {
  const response = await api.get("/admin/project", {
    params: { page, limit, search },
  });
  return response.data;
}

export async function createProject(data) {
  const response = await api.post("/admin/project/create", data);
  return response.data;
}

export async function updateProject(id, data) {
  const response = await api.put(`/admin/project/update/${id}`, data);
  return response.data;
}

export async function deleteProject(id) {
  const response = await api.delete(`/admin/project/delete/${id}`);
  return response.data;
}

export default {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
};
