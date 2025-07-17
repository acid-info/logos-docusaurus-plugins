import { BusinessUnitType } from '@logos-theme/types/theme.types'
import { useState } from 'react'

export const useNewsletterApi = () => {
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState({
    error: false,
    message: '',
  })

  const subscribe = async (
    buType: BusinessUnitType,
    email: string,
    newsletterId: string,
  ) => {
    setBusy(true)

    try {
      const res = await fetch(
        `https://admin-acid.logos.co/api/admin/newsletters/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              email: email,
              type: buType,
              newsletter: newsletterId,
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
