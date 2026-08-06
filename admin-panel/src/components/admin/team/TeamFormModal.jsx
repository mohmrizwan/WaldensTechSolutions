import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../Modal'
import FormField from '../form/FormField'
import { inputClass } from '../form/inputStyles'

/**
 * Add/Edit form for a Team Member. `member` prop null = create mode.
 */
export default function TeamFormModal({ isOpen, onClose, onSubmit, member, isSubmitting }) {
  const isEditMode = !!member

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', role: '', avatarUrl: '' },
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        name: member?.name || '',
        email: member?.email || '',
        role: member?.role || '',
        avatarUrl: member?.avatarUrl || '',
      })
    }
  }, [isOpen, member, reset])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Team Member' : 'Add Team Member'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Full Name" error={errors.name}>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Jordan Lee"
            {...register('name', { required: 'Name is required' })}
          />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <input
            type="email"
            className={inputClass}
            placeholder="e.g. jordan@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
          />
        </FormField>

        <FormField label="Role" error={errors.role}>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Product Designer"
            {...register('role', { required: 'Role is required' })}
          />
        </FormField>

        <FormField label="Avatar URL (optional)" error={errors.avatarUrl}>
          <input
            type="url"
            className={inputClass}
            placeholder="https://..."
            {...register('avatarUrl')}
          />
        </FormField>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
