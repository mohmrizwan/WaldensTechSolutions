import { Mail, Calendar } from 'lucide-react'
import Modal from '../Modal'

/**
 * Read-only view of a contact message. No edit — contacts are
 * inbound submissions, only viewable and deletable.
 */
export default function ContactViewModal({ isOpen, onClose, contact }) {
  if (!contact) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Message Details">
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold text-gray-100">{contact.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Mail size={13} />
              {contact.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '—'}
            </span>
          </div>
        </div>

        {contact.subject && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Subject
            </p>
            <p className="mt-1 text-sm text-gray-200">{contact.subject}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Message
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
            {contact.message}
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
