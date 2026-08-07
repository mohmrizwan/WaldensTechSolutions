import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import DataTable from '../components/admin/DataTable'
import StatusBadge from '../components/admin/StatusBadge'
import ProjectFormModal from '../components/admin/projects/ProjectFormModal'
import ConfirmModal from '../components/admin/ConfirmModal'
import Pagination from '../components/admin/Pagination'
import PageSearchInput from '../components/admin/PageSearchInput'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projectApi'
import { PAGE_SIZE } from '../utils/constants'

/**
 * Projects page — full CRUD via a table view (DataTable), contrasted
 * with Services' card grid to demonstrate both reusable UI patterns.
 */
export default function Projects() {
  const [projects, setProjects] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formModal, setFormModal] = useState({ isOpen: false, project: null })
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, project: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const loadProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchProjects({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      })
      setProjects(result.data)
      setTotalPages(result.totalPages || 1)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setFormError('')
    try {
      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'imageFile') {
          if (value?.[0]) payload.append('imageFile', value[0])
        } else if (value !== undefined && value !== null) {
          payload.append(key, value)
        }
      })

      if (formModal.project) {
        await updateProject(formModal.project._id || formModal.project.id, payload)
      } else {
        await createProject(payload)
      }
      setFormModal({ isOpen: false, project: null })
      loadProjects()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Unable to save project.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true)
    try {
      await deleteProject(deleteModal.project._id || deleteModal.project.id)
      setDeleteModal({ isOpen: false, project: null })
      loadProjects()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    { key: 'name', label: 'Project' },
    { key: 'client', label: 'Client' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (row) => (row.startDate ? new Date(row.startDate).toLocaleDateString() : '—'),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => setFormModal({ isOpen: true, project: row })}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-gray-100"
            aria-label="Edit project"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setDeleteModal({ isOpen: true, project: row })}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            aria-label="Delete project"
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
          <h1 className="text-2xl font-semibold text-gray-100">Projects</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track and manage all client projects.
          </p>
        </div>
        <button
          onClick={() => setFormModal({ isOpen: true, project: null })}
          className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="mt-6">
        <PageSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search projects..."
        />
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          rows={projects}
          isLoading={isLoading}
          error={error}
          emptyTitle="No projects found"
          emptyDescription={
            debouncedSearch
              ? 'Try a different search term.'
              : 'Add your first project to get started.'
          }
        />

        {!isLoading && !error && projects.length > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <ProjectFormModal
        isOpen={formModal.isOpen}
        onClose={() => {
          setFormError('')
          setFormModal({ isOpen: false, project: null })
        }}
        onSubmit={handleFormSubmit}
        project={formModal.project}
        isSubmitting={isSubmitting}
        serverError={formError}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, project: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        description={`Are you sure you want to delete "${deleteModal.project?.name}"? This cannot be undone.`}
        isLoading={isSubmitting}
      />
    </div>
  )
}
