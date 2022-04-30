import { ReactNode, useEffect, useRef, useState } from "react";

export function Sticky(props: { children: (isSticky: boolean) => ReactNode }) {
  const ref = useRef(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const cachedRef = ref.current
    if (!cachedRef) { return }
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1 && e.boundingClientRect.top < 0)
      },
      {
        threshold: [1],
      }
    )

    observer.observe(cachedRef)

    // unmount
    return function () {
      observer.unobserve(cachedRef)
    }
  }, [ref])

  return <div className='sticky'

    style={{
      zIndex: 100,
      top: '-1px',
      paddingTop: 'calc(1px)'
    }}
    ref={ref}>
    {props.children(isSticky)}
  </div>
}