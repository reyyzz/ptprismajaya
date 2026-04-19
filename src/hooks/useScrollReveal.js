import { useEffect, useRef } from 'react'

/**
 * Custom hook that adds scroll-triggered reveal animations.
 * Attaches IntersectionObserver to all .section elements within the ref container.
 * Elements start hidden (via CSS .reveal) and animate in (via .reveal--visible).
 */
export function useScrollReveal() {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const sections = root.querySelectorAll('.section, .project-carousel, .footer')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    sections.forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return containerRef
}
