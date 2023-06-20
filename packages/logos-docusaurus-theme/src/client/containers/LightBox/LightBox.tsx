import { IconButton } from '@acid-info/lsd-react'
import NavbarLogo from '@theme/Navbar/Logo'
import clsx from 'clsx'
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom'
import { useWindowScroll } from 'react-use'
import { IconFullscreen, IconFullscreenExit } from '../../components/Icon/Icon'
import { Portal } from '../../components/Portal/Portal'
import { useHydrated } from '../../lib/useHydrated'
import { useIsMobile } from '../../lib/useIsMobile'
import styles from './styles.module.scss'

export const LightBoxProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const hydrated = useHydrated()
  const scroll = useWindowScroll()
  const [active, setActive] = useState<HTMLElement | null>(null)
  const [activeStyle, setActiveStyle] = useState<CSSProperties>({
    opacity: '0.5',
  })

  const isMobile = useIsMobile()

  const style: React.CSSProperties = useMemo(() => {
    return {
      opacity: 1,
      transform: 'scale(1) translate(0px, 0px)',
      transition: '0.3s',
    }
  }, [active])

  const display = (element: HTMLElement) => {
    setActive(element)

    const vw = document.body.clientWidth
    const vh = window.innerHeight

    const maxWidth = window.innerWidth > 768 ? vw * 0.9375 : vw - 32
    const maxHeight = vh - 128

    const rect = element.getBoundingClientRect()

    const scale = Math.min(maxHeight / rect.height, maxWidth / rect.width)

    const center = [rect.left + rect.width / 2, rect.top + rect.height / 2]
    const windowCenter = [vw / 2, vh / 2]

    const translate = windowCenter.map((w, i) => (w - center[i]!) / scale)

    setActiveStyle({
      zIndex: 202,
      transform: `scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)`,
      position: 'relative',
    })
  }

  const close = () => {
    setActive(null)
  }

  const toggle = (element: HTMLElement) => {
    const current = active

    close()
    current !== element && display(element)
  }

  useEffect(() => {
    if (active && window.innerWidth > 768) close()
  }, [scroll])

  useEffect(() => {
    if (isMobile && active) {
      const html = document.querySelector('html')!
      html.style.overflow = 'hidden'
    } else {
      const html = document.querySelector('html')!
      html.style.overflow = 'initial'
    }
  }, [isMobile, active])

  return (
    <LightBoxContext.Provider
      value={{ active, style, activeStyle, display, close, toggle }}
    >
      {children}
      {hydrated && (
        <Portal containerId="lsd-presentation">
          <>
            <div
              className={clsx(styles.backdrop, active && styles.visible)}
            ></div>
            <div className={clsx(styles.navWrapper, active && styles.visible)}>
              <nav className={clsx(styles.nav, active && styles.visible)}>
                <NavbarLogo />
                <IconButton size="medium" onClick={close}>
                  <IconFullscreenExit />
                </IconButton>
              </nav>
            </div>
          </>
        </Portal>
      )}
    </LightBoxContext.Provider>
  )
}

export type LightBoxContextType = {
  active: HTMLElement | null
  display: (element: HTMLElement) => void
  close: () => void
  toggle: (element: HTMLElement) => void
  style: React.CSSProperties
  activeStyle: React.CSSProperties
}

export const LightBoxContext = React.createContext<LightBoxContextType>({
  style: {},
  activeStyle: {},
  active: null,
  close: null as any,
  toggle: null as any,
  display: null as any,
})

export const useLightBox = () => {
  const ctx = useContext(LightBoxContext)

  const getStyle = (element: HTMLElement) => ({
    ...ctx.style,
    ...(element === ctx.active ? ctx.activeStyle : {}),
  })

  return {
    getStyle,
    style: ctx.style,
    activeStyle: ctx.activeStyle,
    active: ctx.active,
    isActive: !!ctx.active,
    close: ctx.close,
    toggle: ctx.toggle,
    display: ctx.display,
    isActiveElement: (el: HTMLElement) => ctx.active === el,
  }
}

export const LightBoxWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const { getStyle, display, isActiveElement } = useLightBox()

  const isMobile = useIsMobile()
  console.log(isMobile)

  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = childRef

    if (img) {
      const value = make3dTransformValue({ x, y, scale })

      img.style.setProperty('transform', value)
    }
  }, [])

  const content =
    isMobile && ref.current && isActiveElement(ref.current!) ? (
      <QuickPinchZoom
        onUpdate={onUpdate}
        doubleTapZoomOutOnMaxScale
        maxZoom={3}
      >
        <div ref={childRef}>{children}</div>
      </QuickPinchZoom>
    ) : (
      <>
        {children}

        <IconButton
          className={styles.fullscreenButton}
          size="medium"
          onClick={() => ref.current && display(ref.current)}
        >
          <IconFullscreen />
        </IconButton>
      </>
    )

  return (
    <>
      <div
        className={clsx(
          styles.wrapper,
          isActiveElement(ref.current!) && styles.active,
        )}
        ref={ref}
        style={ref.current ? getStyle(ref.current) : {}}
      >
        {content}
      </div>
    </>
  )
}
