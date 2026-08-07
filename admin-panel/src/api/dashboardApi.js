import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export async function fetchDashboardStats() {
  const response = await api.get('/admin/dashboard/stats')
  return response.data
}

export async function fetchRecentActivity() {
  const response = await api.get('/admin/dashboard/activity')
  return response.data
}
