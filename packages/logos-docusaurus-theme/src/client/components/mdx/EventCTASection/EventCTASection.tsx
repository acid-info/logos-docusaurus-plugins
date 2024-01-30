import React from 'react'
import './EventCTASection.scss'
import { Button, TextField, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'

export type EventCTASectionProps = {
  title: string
  description: string
  label: string
  link?: string
  linkProps: Props
  formInput?: any[]
  formListId?: number
}

export const EventCTASection: React.FC<EventCTASectionProps & Props> = ({
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
    <div className="mdx-event-cta-section__container">
      <Typography
        variant="subtitle1"
        component="p"
        className="mdx-event-cta-section__title"
      >
        {title}
      </Typography>

      <Typography
        component="h3"
        variant="h3"
        className="mdx-event-cta-section__description"
      >
        {description}
      </Typography>

      {formInput?.length ? (
        <form className="mdx-event-cta-section__form" onSubmit={handleSubmit}>
          <div className="mdx-event-cta-section__input-fields">
            {formInput.map((input, index) => (
              <TextField
                key={index}
                className="mdx-event-cta-section__input"
                onChange={handleChange}
                value={formState[input.name]}
                inputProps={{ ...input }}
              />
            ))}
          </div>
          <div>
            <Button type="submit" className="mdx-event-cta-section__cta">
              <Typography variant="body1">{label}</Typography>
            </Button>
            <Typography variant="body2">{message}</Typography>
          </div>
        </form>
      ) : (
        <Link to={link} {...linkProps}>
          <Button className="mdx-event-cta-section__cta">
            <Typography variant="body1">{label}</Typography>
          </Button>
        </Link>
      )}
    </div>
  )
}
