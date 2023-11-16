import { useState } from 'react'

export const useNewsletterApi = () => {
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState({
    error: false,
    message: '',
  })

  const subscribe = async (listId: number, email: string, name: string) => {
    setBusy(true)
    try {
      const res = await fetch(
        'https://odoo.logos.co/website_mass_mailing/subscribe2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              name,
              value: email,
              list_id: listId,
              subscription_type: 'email',
            },
          }),
        },
      )
      const data = await res.json()
      setRes({
        error: false,
        message: data.result.message,
      })
    } catch (e) {
      setRes({
        error: true,
        message: 'Something went wrong!',
      })
    }
    setBusy(false)
  }

  return {
    busy,
    error: res.error,
    message: res.message,
    subscribe,
  }
}
