'use client'
import Link from 'next/link'

import useMainMenusService from './service'

const pillStyle: React.CSSProperties = {
  paddingLeft: 'var(--pill-pad-x)',
  paddingRight: 'var(--pill-pad-x)',
  background: 'var(--pill-bg, #fff)',
  color: 'var(--pill-text, var(--base, #000))',
}

const basePillClasses =
  'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-sm leading-1 uppercase tracking-0.2px whitespace-nowrap cursor-pointer px-0'

export default function HeaderMenu() {
  const {
    activeHref,
    setActiveHref,
    navItemsRef,
    circleRefs,
    menuItems,
    handleEnter,
    handleLeave,
  } = useMainMenusService()

  return (
    <div
      ref={navItemsRef}
      className="relative items-center rounded-full hidden md:flex"
      style={{ height: 'var(--nav-h)', background: 'var(--pill-bg)' }}
    >
      <ul
        role="menubar"
        className="list-none flex items-stretch m-0 p-[3px] h-full"
        style={{ gap: 'var(--pill-gap)' }}
      >
        {menuItems.map((item, i) => {
          const isActive = activeHref === item.href

          return (
            <li key={item.href} role="none" className="flex h-full">
              <Link
                role="menuitem"
                href={item.href}
                style={pillStyle}
                className={basePillClasses}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                onClick={() => setActiveHref(item.href)}
              >
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-1 block pointer-events-none"
                  style={{
                    background: 'var(--base, #000)',
                    willChange: 'transform',
                  }}
                  aria-hidden="true"
                  ref={(el) => {
                    circleRefs.current[i] = el
                  }}
                />
                <span className="label-stack relative inline-block leading-1 z-2">
                  <span
                    className="pill-label relative z-2 inline-block leading-1"
                    style={{ willChange: 'transform' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="pill-label-hover absolute left-0 top-0 z-3 inline-block"
                    style={{
                      color: 'var(--hover-text, #fff)',
                      willChange: 'transform, opacity',
                    }}
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-4"
                    style={{ background: 'var(--base, #000)' }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
