import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import DataTable from '../components/admin/DataTable'
import Avatar from '../components/admin/Avatar'
import TeamFormModal from '../components/admin/team/TeamFormModal'
import ConfirmModal from '../components/admin/ConfirmModal'
import Pagination from '../components/admin/Pagination'
import PageSearchInput from '../components/admin/PageSearchInput'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { PAGE_SIZE } from '../utils/constants'
import {
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../api/teamApi'

/**
 * Team page — full CRUD for team members via a table view.
 */
export default function Team() {
  const [members, setMembers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formModal, setFormModal] = useState({ isOpen: false, member: null })
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, member: null })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadMembers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchTeamMembers({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      })
      setMembers(result.data)
      setTotalPages(result.totalPages || 1)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load team members.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch])

  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      if (formModal.member) {
        await updateTeamMember(formModal.member.id, formData)
      } else {
        await createTeamMember(formData)
      }
      setFormModal({ isOpen: false, member: null })
      loadMembers()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true)
    try {
      await deleteTeamMember(deleteModal.member.id)
      setDeleteModal({ isOpen: false, member: null })
      loadMembers()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} avatarUrl={row.avatarUrl} size={32} />
          <span className="font-medium text-gray-100">{row.name}</span>
        </div>
      ),
    },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'joinedAt',
      label: 'Joined',
      render: (row) => (row.joinedAt ? new Date(row.joinedAt).toLocaleDateString() : '—'),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => setFormModal({ isOpen: true, member: row })}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-gray-100"
            aria-label="Edit team member"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setDeleteModal({ isOpen: true, member: row })}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            aria-label="Remove team member"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Team</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your team members and their roles.
          </p>
        </div>
        <button
          onClick={() => setFormModal({ isOpen: true, member: null })}
          className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark"
        >
          <Plus size={16} />
          Add Team Member
        </button>
      </div>

      <div className="mt-6">
        <PageSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search team members..."
        />
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          rows={members}
          isLoading={isLoading}
          error={error}
          emptyTitle="No team members found"
          emptyDescription={
            debouncedSearch
              ? 'Try a different search term.'
              : 'Add your first team member to get started.'
          }
        />

        {!isLoading && !error && members.length > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <TeamFormModal
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, member: null })}
        onSubmit={handleFormSubmit}
        member={formModal.member}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, member: null })}
        onConfirm={handleDeleteConfirm}
        title="Remove Team Member"
        description={`Are you sure you want to remove "${deleteModal.member?.name}"? This cannot be undone.`}
        isLoading={isSubmitting}
      />
    </div>
  )
}
