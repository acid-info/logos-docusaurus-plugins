import { SearchIcon, TextField } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { useMedia } from 'react-use'
import styles from './SearchInput.module.scss'

export type SearchInputProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'value' | 'onChange'
> &
  Pick<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
    inputProps?: React.HTMLProps<HTMLInputElement>
    containerRef?: React.RefObject<HTMLDivElement>
    value?: string
    active?: boolean
    onFocus?: () => void
    onCancel?: () => void
    onClear?: () => void
  }

export const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  active,
  onChange,
  onClear,
  onFocus: onFocusCallback,
  onCancel,
  className,
  inputProps: { ref: inputRef, ...inputProps } = { placeholder: '' },
  containerRef,
  ...props
}) => {
  const isMobile = useMedia('(max-width: 996px)')

  const expanded = active || value?.length > 0

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocusCallback && onFocusCallback()
  }

  return (
    <div
      ref={containerRef}
      className={clsx(styles.root, expanded && styles.expanded, className)}
      onKeyDown={(e) => {
        if (e.code === 'Escape' && value.length > 0) {
          e.stopPropagation()
          onClear && onClear()
        }
      }}
      {...props}
    >
      <TextField
        className={styles.textField}
        value={value}
        placeholder={expanded || isMobile ? inputProps.placeholder : ''}
        onChange={onChange}
        onFocus={onFocus}
        clearButton
        icon={<SearchIcon color="primary" />}
        {...(inputProps as any)}
      />
    </div>
  )
}
