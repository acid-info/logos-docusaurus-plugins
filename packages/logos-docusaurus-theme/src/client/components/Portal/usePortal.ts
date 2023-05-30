import { useEffect, useRef } from 'react'
import { settleSync } from '../../lib/settle'

interface Props {
  parentId: string
}

export const usePortal = ({ parentId }: Props) => {
  const elementRef = useRef<HTMLElement>()

  if (!elementRef.current) {
    elementRef.current = document.createElement('div')
  }

  useEffect(() => {
    if (!elementRef.current) return
    document.getElementById(parentId)?.appendChild(elementRef.current)

    return () => {
      const el = elementRef.current
      el && settleSync(() => document.getElementById(parentId)?.removeChild(el))
    }
  }, [parentId, elementRef.current])

  return elementRef.current
}
