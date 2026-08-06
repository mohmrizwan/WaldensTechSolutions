import { Loader2 } from 'lucide-react'

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
}

/**
 * Basic spinner used for full-page and inline loading states.
 * Will be revisited for styling polish in a later step.
 */
export default function Loader({ size = 'md', className = '' }) {
  return (
    <Loader2
      className={`animate-spin text-accent ${sizeMap[size] || sizeMap.md} ${className}`}
    />
  )
}
