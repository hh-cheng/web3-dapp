import { gsap } from 'gsap'
import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ease = 'power3.easeOut'

const cssVars = {
  ['--base']: '#ffffff',
  ['--pill-bg']: '#f0f0f0',
  ['--hover-text']: '#0a0e27',
  ['--pill-text']: '#0a0e27',
  ['--nav-h']: '42px',
  ['--pill-pad-x']: '18px',
  ['--pill-gap']: '3px',
} as React.CSSProperties

const menuItems = [
  { label: 'Ethers', href: '/ethers' },
  { label: 'RPC', href: '/rpc' },
  { label: 'TheGraph', href: '/graph' },
  { label: 'RedPacket', href: '/redPacket' },
]

export default function useHeaderMenuService() {
  const navItemsRef = useRef<HTMLDivElement | null>(null)
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([])
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])

  const pathname = usePathname()

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return

        const pill = circle.parentElement as HTMLElement
        const rect = pill.getBoundingClientRect()
        const { width: w, height: h } = rect
        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        const originY = D - delta

        circle.style.width = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        })

        const label = pill.querySelector<HTMLElement>('.pill-label')
        const white = pill.querySelector<HTMLElement>('.pill-label-hover')

        if (label) gsap.set(label, { y: 0 })
        if (white) gsap.set(white, { y: h + 12, opacity: 0 })

        const index = circleRefs.current.indexOf(circle)
        if (index === -1) return

        tlRefs.current[index]?.kill()
        const tl = gsap.timeline({ paused: true })

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' },
          0,
        )

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 })
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' },
            0,
          )
        }

        tlRefs.current[index] = tl
      })
    }

    layout()

    const onResize = () => layout()
    window.addEventListener('resize', onResize)

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {})
    }

    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      ease,
      duration: 0.2,
      overwrite: 'auto',
    })
  }

  return {
    cssVars,
    pathname,
    menuItems,
    circleRefs,
    navItemsRef,
    handleEnter,
    handleLeave,
  }
}
