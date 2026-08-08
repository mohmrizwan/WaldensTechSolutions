import api from './api'

export async function fetchDashboardStats() {
  const response = await api.get('/admin/dashboard/stats')
  return response.data
}

export async function fetchRecentActivity() {
  const response = await api.get('/admin/dashboard/activity')
  return response.data
}
