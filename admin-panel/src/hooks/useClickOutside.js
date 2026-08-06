import { useEffect } from 'react'

/**
 * Calls handler when a click/touch happens outside the given ref's element.
 * Used to close dropdown menus (notifications, profile) on outside click.
 */
export function useClickOutside(ref, handler, isActive = true) {
  useEffect(() => {
    if (!isActive) return

    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, handler, isActive])
}
