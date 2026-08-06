/**
 * Circular avatar — shows an image if avatarUrl is provided, otherwise
 * falls back to the first letter of the name on a gradient background.
 */
export default function Avatar({ name, avatarUrl, size = 36 }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    )
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-sm font-medium text-white"
    >
      {(name || '?').charAt(0).toUpperCase()}
    </div>
  )
}
