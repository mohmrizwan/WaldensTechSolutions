import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const getCurrentAdmin = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/me`, {
    withCredentials: true,
  });

  return response.data;
};
