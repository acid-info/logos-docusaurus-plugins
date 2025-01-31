import React from 'react'
import './InputCTASection.scss'
import { Button, TextField, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'
import clsx from 'clsx'

export type InputCTASectionProps = {
  title: string
  description: string
  label: string
  link?: string
  linkProps?: Props
  formInput?: any[]
  buType?: buType
}

type buType = 'codex' | 'waku' | 'nomos'

export const InputCTASection: React.FC<InputCTASectionProps & Props> = ({
  title,
  description,
  label,
  link,
  linkProps,
  formInput,
  buType,
}) => {
  const [formState, setFormState] = React.useState({ email: '', name: '' })
  const [message, setMessage] = React.useState('')

  const errorMessage = 'There was an error submitting the form.'

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!formState?.email) {
      setMessage('Please enter an email address')
      return
    }

    try {
      const res = await fetch(
        `https://odoo.logos.co/website_mass_mailing/subscribe_ghost`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              email: formState?.email,
              type: buType,
              subscription_type: 'email',
            },
          }),
        },
      )

      const data = await res.json()

      if (data?.result?.errors && data?.result?.errors[0]?.context?.length) {
        setMessage(data?.result?.errors[0].context.message)
        return
      }

      setMessage('Thank you for subscribing!')
    } catch (error) {
      console.log(error)
      setMessage(errorMessage)
    }
  }

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <div className="mdx-input-cta-section__container">
      {title && (
        <Typography
          variant="subtitle1"
          component="p"
          className="mdx-input-cta-section__title"
        >
          {title}
        </Typography>
      )}

      <Typography
        component="h3"
        variant="h3"
        className={clsx(
          'input-cta-section__description',
          !formInput && 'input-cta-section__description--no-form',
        )}
      >
        {description}
      </Typography>

      {formInput?.length ? (
        <form className="mdx-input-cta-section__form" onSubmit={handleSubmit}>
          <div className="mdx-input-cta-section__input-fields">
            {formInput.map((input, index) => (
              <TextField
                key={index}
                className="mdx-input-cta-section__input"
                onChange={handleChange}
                value={formState[input.name]}
                inputProps={{ ...input }}
              />
            ))}
          </div>
          <div>
            <Button type="submit" className="mdx-input-cta-section__cta">
              <Typography variant="body1">{label}</Typography>
            </Button>
          </div>
        </form>
      ) : (
        <Link to={link} {...linkProps}>
          <Button className="mdx-input-cta-section__cta">
            <Typography variant="body1">{label}</Typography>
          </Button>
        </Link>
      )}
      {message && (
        <Typography className="mdx-input-cta-section__message" variant="body2">
          {message}
        </Typography>
      )}
    </div>
  )
}
