import {
  globalStore,
  selectHiddenSidebar,
} from '@logos-theme/containers/GlobalStore/index'
import { useTeam } from '@logos-theme/lib/team.utils'
import { ECommunityProviders } from '@logos-theme/types/ui.types'
import clsx from 'clsx'
import React from 'react'
import { SocialMediaItem } from '@logos-theme/components/Icon/SocialmediaLink'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const TeamList = (props: TProps): JSX.Element => {
  const team = useTeam()
  const hiddenSidebar = globalStore.useSelector(selectHiddenSidebar)

  return (
    <section className={styles.TeamList}>
      <div
        className={clsx(
          styles.TeamListContainer,
          hiddenSidebar ? styles.withSidebarHide : false,
        )}
      >
        {team.map((member, index) => (
          <div className={clsx('', styles.memberCard)} key={`mc-${index}`}>
            <div className={clsx('', styles.memberCardImage)}>
              <img
                src={member['photo-path'] ?? ''}
                alt={member['pref-name']}
                title={member.contact.email ?? ''}
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
                {member.contact.gscholar && (
                  <SocialMediaItem
                    handler={member.contact.gscholar}
                    provider={ECommunityProviders.gscholar}
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
