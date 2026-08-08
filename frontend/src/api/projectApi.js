const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

export async function fetchProjects({ page = 1, limit = 12, search = "" } = {}) {
  const url = new URL(`${API_BASE_URL}/admin/project`);
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (search) {
    url.searchParams.set("search", search);
  }

  const response = await fetch(url.toString(), {

  });

  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  const payload = await response.json();
  return payload.data || [];
}

export default {
  fetchProjects,
};
