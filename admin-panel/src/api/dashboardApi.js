export async function fetchDashboardStats() {
  return Promise.resolve({
    totalServices: 6,
    totalProjects: 12,
    totalTeamMembers: 8,
    totalContacts: 24,
    servicesTrend: 12,
    projectsTrend: 8,
    teamTrend: 5,
    contactsTrend: 18,
  })
}

export async function fetchRecentActivity() {
  return Promise.resolve([
    { id: '1', title: 'New service added', description: 'Added a new SEO optimization service.', date: new Date().toISOString() },
    { id: '2', title: 'Project updated', description: 'Updated the project status for Acme website.', date: new Date().toISOString() },
    { id: '3', title: 'New message received', description: 'Received a new message from a prospective client.', date: new Date().toISOString() },
  ])
}
