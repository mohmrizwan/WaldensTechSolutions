const teamMembers = [
  { id: '1', name: 'Jordan Lee', email: 'jordan@example.com', role: 'Product Designer', avatarUrl: '', joinedAt: '2024-08-12' },
  { id: '2', name: 'Nina Patel', email: 'nina@example.com', role: 'Backend Engineer', avatarUrl: '', joinedAt: '2024-09-02' },
]

export async function fetchTeamMembers({ page = 1, limit = 8, search = '' } = {}) {
  const filtered = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  )
  return Promise.resolve({
    data: filtered.slice((page - 1) * limit, page * limit),
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  })
}

export async function createTeamMember(data) {
  teamMembers.push({ id: String(Date.now()), joinedAt: new Date().toISOString(), ...data })
  return Promise.resolve({ success: true })
}

export async function updateTeamMember(id, data) {
  const index = teamMembers.findIndex((item) => item.id === id)
  if (index !== -1) {
    teamMembers[index] = { ...teamMembers[index], ...data }
  }
  return Promise.resolve({ success: true })
}

export async function deleteTeamMember(id) {
  const index = teamMembers.findIndex((item) => item.id === id)
  if (index !== -1) {
    teamMembers.splice(index, 1)
  }
  return Promise.resolve({ success: true })
}
