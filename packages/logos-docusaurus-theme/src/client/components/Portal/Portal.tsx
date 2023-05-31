import React from 'react'
import { createPortal } from 'react-dom'
import { usePortal } from './usePortal'

interface PortalProps {
  id?: string
  containerId: string
}

export const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({
  children,
  containerId,
  id,
}) => {
  if (typeof window === 'undefined') {
    return <></>
  }

  const portalElement = usePortal({ parentId: containerId })

  const portal = createPortal(children, portalElement, id)

  return portal
}
