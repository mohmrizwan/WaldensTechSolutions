import { useState, useEffect } from 'react'

/**
 * Returns a debounced copy of `value`, updated only after `delay` ms of
 * no changes. Used for search inputs so we don't refetch on every keystroke.
 */
export function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
