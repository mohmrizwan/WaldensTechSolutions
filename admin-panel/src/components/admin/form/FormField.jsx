/**
 * Reusable input wrapper for React Hook Form fields. Handles label,
 * error display, and consistent styling so every form (Service, Project,
 * Team, Settings) looks and behaves the same without duplicating markup.
 */
export default function FormField({ label, error, children }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  )
}
