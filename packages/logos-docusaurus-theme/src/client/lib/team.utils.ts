import { Status } from '@acid-info/logos-docusaurus-preset'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { useEffect, useState } from 'react'

export const useTeam = () => {
  const [contributors, setContributors] = useState<Status.Contacts.Contact[]>(
    [],
  )
  const url = useBaseUrl(`/data/team.json`)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setContributors(data)
      })
  }, [])

  return contributors
}
