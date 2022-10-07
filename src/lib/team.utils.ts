import useBaseUrl from '@docusaurus/useBaseUrl'
import { useEffect, useState } from 'react'
import { ELogosTeamNames, IStatusTeamMember } from '../types/team'

interface IStatusTeamMembersApiResponse {
  [key: string]: IStatusTeamMember
}

export const useTeam = (team: ELogosTeamNames) => {
  const [contributors, setContributors] = useState<IStatusTeamMember[]>([])
  const url = useBaseUrl(`/data/team.json`)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: IStatusTeamMembersApiResponse) => {
        setContributors(
          Object.values(data).filter(
            (d) => d.department && d.department.toLocaleLowerCase() === team,
          ),
        )
      })
  }, [])
  return contributors
}
