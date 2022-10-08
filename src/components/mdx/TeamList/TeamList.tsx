import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import { useTeam } from '@site/src/lib/team.utils'
import { ELogosTeamNames } from '@site/src/types/team'
import { SocialMediaItem } from '../../Icon/SocialmediaLink'
import { ECommunityProviders } from '@site/src/types/ui.types'

type TProps = {
  children: React.ReactNode
}

export const TeamList = (props: TProps): JSX.Element => {
  const team = useTeam('codex' as ELogosTeamNames)

  return (
    <section className={styles.TeamList}>
      <div className={styles.TeamListContainer}>
        {team.map((member, index) => (
          <div className={clsx('', styles.memberCard)} key={`mc-${index}`}>
            <div className={clsx('', styles.memberCardImage)}>
              <img
                src={member['photo-path']}
                alt={member['pref-name']}
                title={member.contact.email}
              />
            </div>
            <div className={clsx('card', styles.memberCardCaption)}>
              <div>
                <h5>{member['pref-name']}</h5>
                <small className={styles.memberEmail}>
                  {member.contact.email}
                </small>
              </div>
              <div className={styles.memberSocials}>
                {member.contact.github && (
                  <SocialMediaItem
                    handler={member.contact.github}
                    provider={ECommunityProviders.github}
                  />
                )}
                {member.contact.status && (
                  <SocialMediaItem
                    handler={member.contact.status}
                    provider={ECommunityProviders.status}
                  />
                )}
                {member.contact.discord && (
                  <SocialMediaItem
                    handler={member.contact.discord}
                    provider={ECommunityProviders.discord}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
