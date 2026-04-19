import { useEffect, useRef, useState } from 'react'

/**
 * Hook that animates a number counting up from 0 to the target value
 * when the element scrolls into view.
 * @param {number} target - The final number to count to
 * @param {number} duration - Animation duration in milliseconds
 * @returns {{ ref: React.RefObject, count: number }}
 */
export function useCountUp(target, duration = 2500) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3)
            const currentValue = Math.round(eased * target)

            setCount(currentValue)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [target, duration])

  return { ref, count }
}
