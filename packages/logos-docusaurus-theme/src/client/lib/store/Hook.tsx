import React, { useEffect } from 'react'

export const Hook: React.FC<{
  hook: Function
  onChange: (value: any) => void
}> = ({ hook: useHook, onChange }) => {
  const value = useHook()

  useEffect(() => {
    onChange(value)
  }, [value])

  return <></>
}
