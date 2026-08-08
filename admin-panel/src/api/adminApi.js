import api from "./api";

export const getCurrentAdmin = async () => {
  const response = await api.get("/admin/me");

  return response.data;
};
