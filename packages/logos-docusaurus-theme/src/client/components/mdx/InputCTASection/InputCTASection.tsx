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
  formListId?: number
}

export const InputCTASection: React.FC<InputCTASectionProps & Props> = ({
  title,
  description,
  label,
  link,
  linkProps,
  formInput,
  formListId,
}) => {
  const [formState, setFormState] = React.useState({ email: '', name: '' })
  const [message, setMessage] = React.useState('')

  const errorMessage =
    'There was an error submitting the form. Please try again.'

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await fetch(
        `https://odoo.logos.co/website_mass_mailing/subscribe2`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              value: formState?.email,
              name: formState?.name || '',
              list_id: formListId,
              subscription_type: 'email',
            },
          }),
        },
      )

      const data = await res.json()
      setMessage(data.result.message)
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
            <Typography
              className="mdx-input-cta-section__message"
              variant="body2"
            >
              {message}
            </Typography>
          </div>
        </form>
      ) : (
        <Link to={link} {...linkProps}>
          <Button className="mdx-input-cta-section__cta">
            <Typography variant="body1">{label}</Typography>
          </Button>
        </Link>
      )}
    </div>
  )
}
