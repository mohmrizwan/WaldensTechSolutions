import { useState, useEffect, useCallback } from 'react'
import { Eye, Trash2, Circle } from 'lucide-react'
import DataTable from '../components/admin/DataTable'
import ContactViewModal from '../components/admin/contacts/ContactViewModal'
import ConfirmModal from '../components/admin/ConfirmModal'
import Pagination from '../components/admin/Pagination'
import PageSearchInput from '../components/admin/PageSearchInput'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { PAGE_SIZE } from '../utils/constants'
import { fetchContacts, deleteContact } from '../api/contactApi'

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [viewModal, setViewModal] = useState({ isOpen: false, contact: null })
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, contact: null })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadContacts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchContacts({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      })
      setContacts(result.data)
      setTotalPages(result.totalPages || 1)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load contacts.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const handleViewContact = async (contact) => {
    setViewModal({ isOpen: true, contact })
    
    }
  

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true)
    try {
      await deleteContact(deleteModal.contact._id)
      setDeleteModal({ isOpen: false, contact: null })
      loadContacts()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete contact.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    {
      key: 'isRead',
      label: '',
      render: (row) =>
        !row.isRead && (
          <Circle size={8} className="fill-accent text-accent" aria-label="Unread" />
        ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <span className={row.isRead ? 'text-gray-300' : 'font-semibold text-gray-100'}>
          {row.name}
        </span>
      ),
    },
    { key: 'email', label: 'Email' },
    {
      key: 'subject',
      label: 'Subject',
      render: (row) => row.subject || '—',
    },
    {
      key: 'createdAt',
      label: 'Received',
      render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => handleViewContact(row)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-gray-100"
            aria-label="View message"
          >
            <Eye size={15} />
          </button>
          <button
            onClick={() => setDeleteModal({ isOpen: true, contact: row })}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            aria-label="Delete message"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-100">Contacts</h1>
        <p className="mt-1 text-sm text-gray-400">
          Messages submitted through your site's contact form.
        </p>
      </div>

      <div className="mt-6">
        <PageSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search messages..."
        />
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          rows={contacts}
          isLoading={isLoading}
          error={error}
          emptyTitle="No messages found"
          emptyDescription={
            debouncedSearch
              ? 'Try a different search term.'
              : "You'll see contact form submissions here."
          }
        />

        {!isLoading && !error && contacts.length > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <ContactViewModal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, contact: null })}
        contact={viewModal.contact}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, contact: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Message"
        description={`Delete the message from "${deleteModal.contact?.name}"? This cannot be undone.`}
        isLoading={isSubmitting}
      />
    </div>
  )
}
