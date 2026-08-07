import { useState, useEffect, useCallback } from 'react'
import { Layers, FolderKanban, Users, Mail } from 'lucide-react'
import StatsCard from '../components/admin/StatsCard'
import RecentActivity from '../components/admin/dashboard/RecentActivity'
import ChartPlaceholder from '../components/admin/dashboard/ChartPlaceholder'
import QuickActions from '../components/admin/dashboard/QuickActions'
import Loader from '../components/admin/Loader'
import { fetchDashboardStats, fetchRecentActivity } from '../api/dashboardApi'


export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [isStatsLoading, setIsStatsLoading] = useState(true)
  const [isActivityLoading, setIsActivityLoading] = useState(true)
  const [statsError, setStatsError] = useState(null)
  const [activityError, setActivityError] = useState(null)

  const loadStats = useCallback(async () => {
    setIsStatsLoading(true)
    setStatsError(null)
    try {
      const data = await fetchDashboardStats()
      setStats(data)
    } catch (err) {
      setStatsError(err.response?.data?.message || 'Failed to load statistics.')
    } finally {
      setIsStatsLoading(false)
    }
  }, [])

  const loadActivity = useCallback(async () => {
    setIsActivityLoading(true)
    setActivityError(null)
    try {
      const data = await fetchRecentActivity()
      setActivity(data)
    } catch (err) {
      setActivityError(err.response?.data?.message || 'Failed to load activity.')
    } finally {
      setIsActivityLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
    loadActivity()
  }, [loadStats, loadActivity])

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-100">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Overview of your site's activity and content.
        </p>
      </div>

      {/* Stats grid */}
      {isStatsLoading && (
        <div className="mt-6 flex justify-center py-10">
          <Loader size="lg" />
        </div>
      )}

      {!isStatsLoading && statsError && (
        <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {statsError}
        </p>
      )}

      {!isStatsLoading && !statsError && stats && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            label="Total Services"
            value={stats.totalServices}
            icon={Layers}
            trend={stats.servicesTrend}
            accentColor="accent"
          />
          <StatsCard
            label="Total Projects"
            value={stats.totalProjects}
            icon={FolderKanban}
            trend={stats.projectsTrend}
            accentColor="emerald"
          />
          <StatsCard
            label="Team Members"
            value={stats.totalTeamMembers}
            icon={Users}
            trend={stats.teamTrend}
            accentColor="amber"
          />
          <StatsCard
            label="New Contacts"
            value={stats.totalContacts}
            icon={Mail}
            trend={stats.contactsTrend}
            accentColor="rose"
          />
        </div>
      )}

      {/* Chart + Quick Actions + Activity */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <ChartPlaceholder data={stats?.chart || []} />
          <QuickActions />
        </div>
        <RecentActivity
          activity={activity}
          isLoading={isActivityLoading}
          error={activityError}
        />
      </div>
    </div>
  )
}
