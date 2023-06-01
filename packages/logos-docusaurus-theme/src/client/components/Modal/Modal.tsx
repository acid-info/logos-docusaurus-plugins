import clsx from 'clsx'
import React from 'react'
import { useKeyPressEvent } from 'react-use'
import { useHydrated } from '../../lib/useHydrated'
import { Portal } from '../Portal/Portal'
import './Modal.scss'

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean
  onClose?: () => void
  keepMounted?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  keepMounted = false,
  className,
  children,
  ...props
}) => {
  const hydrated = useHydrated()

  const handleClose = () => {
    onClose && onClose()
  }

  useKeyPressEvent(
    (key) => key.code === 'Escape',
    (event) => {
      handleClose()
    },
  )

  if (!hydrated) return <></>
  if (!open && !keepMounted) return <></>

  return (
    <Portal containerId="lsd-presentation" id={props.id}>
      <div
        className={clsx(className, 'l-modal', open && 'l-modal--open')}
        {...(props as any)}
      >
        <div className="l-modal__container">
          <div className="l-modal__content">{children}</div>
          <div className="l-modal__backdrop" onClick={handleClose} />
        </div>
      </div>
    </Portal>
  )
}
