import React from 'react'
import './InputCTASection.scss'
import { Button, TextField, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'
import clsx from 'clsx'
import { BusinessUnitType } from '@logos-theme/types/theme.types'

export type InputCTASectionProps = {
  title: string
  description: string
  label: string
  link?: string
  linkProps?: Props
  formInput?: any[]
  buType?: BusinessUnitType
  newsletterId?: string
  successMessage?: string
}

export const InputCTASection: React.FC<InputCTASectionProps & Props> = ({
  title,
  description,
  label,
  link,
  linkProps,
  formInput,
  buType,
  newsletterId,
  successMessage = 'Thank you for subscribing!',
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
      if (!buType || !newsletterId) {
        setMessage('Business unit type or newsletter ID is missing.')
        return
      }

      const res = await fetch(
        `https://admin-acid.logos.co/api/admin/newsletters/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email,
            type: buType,
            newsletter: newsletterId,
          }),
        },
      )

      const data = await res.json()

      if (data?.result?.errors && data?.result?.errors[0]?.context?.length) {
        setMessage(data?.result?.errors[0].context)
        return
      } else if (data?.result?.message?.length) {
        setMessage(data.result.message)
        return
      }

      setMessage(successMessage)
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
