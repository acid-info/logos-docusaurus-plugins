import {
  Button,
  CheckIcon,
  ErrorIcon,
  TextField,
  Toast,
} from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { CallToActionSection } from '..'
import { useNewsletterApi } from '../../../lib/useNewsletterApi'
import './NewsletterSubscription.scss'
import { buType } from '@logos-theme/types/businessUnits'

export type NewsletterSubscriptionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  byType: buType
  title?: React.ReactNode
  description?: React.ReactNode
  newsletterId: string
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  title: _title,
  description: _description,
  byType,
  newsletterId,
  ...props
}) => {
  const api = useNewsletterApi()
  const displayForm = !api.message || api.error

  const title = _title ?? 'Newsletter'
  const description = _description ?? (
    <>
      Subscribe
      <br />
      to our newsletter
    </>
  )

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    api.subscribe(byType, email, newsletterId)
  }

  return (
    <CallToActionSection
      className="mdx-ns"
      title={<span className="mdx-ns__title">{title}</span>}
      description={
        <div className="mdx-ns__inner">
          <span className="mdx-ns__description">{description}</span>

          <form onSubmit={onSubmit}>
            {api.message && (
              <Toast
                title={api.message}
                className="mdx-ns__toast"
                icon={api.error ? ErrorIcon : CheckIcon}
              />
            )}
            <div className={clsx('mdx-ns__inputs', !displayForm && 'hidden')}>
              <TextField
                inputProps={{ type: 'text', name: 'name' }}
                variant="underlined"
                placeholder="First name or pseudonym"
              />
              <TextField
                inputProps={{
                  type: 'email',
                  name: 'email',
                  required: true,
                }}
                variant="underlined"
                placeholder="Email address (required)"
              />
            </div>

            <Button
              size="large"
              color="primary"
              variant="outlined"
              className={clsx(
                'mdx-ns__submit-button',
                !displayForm && 'hidden',
              )}
              disabled={api.busy}
            >
              Subscribe
            </Button>
          </form>
        </div>
      }
      columns={2}
      {...props}
    />
  )
}
