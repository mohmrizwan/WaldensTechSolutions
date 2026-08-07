import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../Modal'
import FormField from '../form/FormField'
import { inputClass, textareaClass } from '../form/inputStyles'

const STATUS_OPTIONS = ['active', 'completed', 'on-hold', 'cancelled']

/**
 * Add/Edit form for a Project. `project` prop null = create mode.
 */
export default function ProjectFormModal({ isOpen, onClose, onSubmit, project, isSubmitting, serverError }) {
  const isEditMode = !!project

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      client: '',
      status: 'active',
      description: '',
      projectUrl: '/project',
      imageUrl: '',
      imageFile: null,
      startDate: '',
      endDate: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        name: project?.name || '',
        client: project?.client || '',
        status: project?.status || 'active',
        description: project?.description || '',
        projectUrl: project?.projectUrl || '/project',
        imageUrl: project?.imageUrl || '',
        imageFile: null,
        startDate: project?.startDate?.slice(0, 10) || '',
        endDate: project?.endDate?.slice(0, 10) || '',
      })
    }
  }, [isOpen, project, reset])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Project' : 'Add Project'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {serverError}
          </div>
        )}

        <FormField label="Project Name" error={errors.name}>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Website Redesign"
            {...register('name', { required: 'Project name is required' })}
          />
        </FormField>

        <FormField label="Client" error={errors.client}>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Acme Corp"
            {...register('client', { required: 'Client is required' })}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Start Date" error={errors.startDate}>
            <input type="date" className={inputClass} {...register('startDate')} />
          </FormField>
          <FormField label="End Date" error={errors.endDate}>
            <input type="date" className={inputClass} {...register('endDate')} />
          </FormField>
        </div>

        <FormField label="Status" error={errors.status}>
          <select className={inputClass} {...register('status')}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Project URL" error={errors.projectUrl}>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. https://example.com"
            {...register('projectUrl', {
              pattern: {
                value: /^(\/|https?:\/\/).+/i,
                message: 'Use a relative path or an http(s) URL',
              },
            })}
          />
        </FormField>

        <FormField label="Project Image" error={errors.imageFile}>
          <input
            type="file"
            accept="image/*"
            className={inputClass}
            {...register('imageFile')}
          />
          {project?.imageUrl && (
            <p className="mt-1 text-xs text-gray-500">Choose a new file only if you want to replace the current image.</p>
          )}
        </FormField>

        <FormField label="Description" error={errors.description}>
          <textarea
            rows={3}
            className={textareaClass}
            placeholder="Brief project summary..."
            {...register('description')}
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
            {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Project'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
