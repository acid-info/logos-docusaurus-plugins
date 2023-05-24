import { useOS } from '@logos-theme/lib/useOS'
import { useWindowEventListener } from '@logos-theme/lib/useWindowEventListener'
import clsx from 'clsx'
import React from 'react'
import { useMedia } from 'react-use'
import styles from './SearchInput.module.scss'
import { Typography } from '@acid-info/lsd-react'

export type SearchInputProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'value' | 'onChange'
> &
  Pick<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
    inputProps?: Omit<React.HTMLProps<HTMLInputElement>, 'ref'> & {
      ref: React.RefObject<HTMLInputElement>
    }
    value?: string
    active?: boolean
    onFocus?: () => void
    onCancel?: () => void
  }

export const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  active,
  onChange,
  onFocus: onFocusCallback,
  onCancel,
  className,
  inputProps: { ref: inputRef, ...inputProps } = { placeholder: '' },
  ...props
}) => {
  const os = useOS()
  const isMobile = useMedia('(max-width: 996px)')

  const expanded = active || value?.length > 0

  const focus = () => {
    inputRef?.current && inputRef.current.focus()
  }

  const blur = () => {
    inputRef?.current && inputRef.current.blur()
    onCancel && onCancel()
  }

  useWindowEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
      event.preventDefault()
      focus()
    } else if (event.code === 'Escape') {
      blur()
    }
  })

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocusCallback && onFocusCallback()
  }

  return (
    <div
      className={clsx(styles.root, expanded && styles.expanded, className)}
      {...props}
    >
      <Typography component="span" color="primary">
        Search
      </Typography>
      <input
        value={value}
        onChange={onChange}
        ref={inputRef}
        onFocus={onFocus}
        {...inputProps}
        placeholder={expanded || isMobile ? inputProps.placeholder : ''}
      />
      <div className={styles.shortcuts}>
        {active ? (
          <kbd>esc</kbd>
        ) : (
          <>
            <kbd>{os === 'mac' ? '⌘' : 'ctrl'}</kbd>
            <kbd>k</kbd>
          </>
        )}
      </div>
    </div>
  )
}
