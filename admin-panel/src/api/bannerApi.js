import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const bannerApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchBanner = async () => {
  const response = await bannerApi.get("/admin/banner/get");
  return response.data;
};

export const createBanner = async (bannerData) => {
  const response = await bannerApi.post("/admin/banner/create", bannerData);
  return response.data;
};

export const updateBanner = async (id, bannerData) => {
  const response = await bannerApi.put(`/admin/banner/update/${id}`, bannerData);
  return response.data;
};

export default {
  fetchBanner,
  createBanner,
  updateBanner,
};
