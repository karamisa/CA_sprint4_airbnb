import { useEffect, useState } from "react"
//MAEKE using intersection observer convenian in react
export default function useOnScreen(ref, rootMargin = "0px" ) {
  const [isVisible, setIsVisible] = useState(true)


  useEffect(() => {
    if (ref.current == null) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [rootMargin,ref, ref.current])

  return isVisible
}