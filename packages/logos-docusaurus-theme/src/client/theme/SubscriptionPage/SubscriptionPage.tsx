import {
  Button,
  CheckIcon,
  ErrorIcon,
  TextField,
  Toast,
  Typography,
} from '@acid-info/lsd-react'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import React from 'react'
import { useNewsletterApi } from '../../lib/useNewsletterApi'
import { useThemeOptions } from '../../lib/useThemeOptions'
import styles from './SubscriptionPage.module.scss'
import Link from '@docusaurus/Link'

export type SubscriptionPageProps = {}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({}) => {
  const opts = useThemeOptions()
  const api = useNewsletterApi()
  const displayForm = !api.message || api.error

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value

    api.subscribe(opts.newsletterSubscription!.mailingListId!, email, name)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.root}>
          <div className={styles.header}>
            <ThemedImage
              sources={{
                dark: '/theme/image/horizontal_lockup_small_white.svg',
                light: '/theme/image/horizontal_lockup_small_black.svg',
              }}
              height={88}
            />
            <Typography component="p">Subscribe for updates</Typography>
          </div>
          {api.message && (
            <Toast
              size="medium"
              title={api.message}
              icon={api.error ? ErrorIcon : CheckIcon}
              className={styles.toast}
            />
          )}
          {api.error && api.message && <div></div>}
          {displayForm && (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.inputs}>
                <TextField
                  inputProps={{
                    name: 'name',
                    type: 'text',
                    required: false,
                  }}
                  size="medium"
                  variant="underlined"
                  placeholder="First Name or Pseudonym"
                />
                <TextField
                  inputProps={{
                    name: 'email',
                    type: 'email',
                    required: true,
                  }}
                  size="medium"
                  variant="underlined"
                  placeholder="Email address (required)"
                />
              </div>
              <div className={styles.submit}>
                <Button variant="filled" disabled={api.busy}>
                  Subscribe
                </Button>
              </div>
            </form>
          )}
          {!displayForm && (
            <div className={styles.toHome}>
              <Link href="/">
                <Button variant="filled">To home page</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default SubscriptionPage
