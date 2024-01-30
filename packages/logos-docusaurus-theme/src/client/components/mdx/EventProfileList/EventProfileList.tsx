import React from 'react'
import './EventProfileList.scss'
import { Typography } from '@acid-info/lsd-react'
import { Box, EventProfile, EventProfileProps, Grid } from '..'

export type EventProfileListProps = {
  title?: string
  description?: string
  data: EventProfileProps[]
}

export const EventProfileList: React.FC<EventProfileListProps> = ({
  title,
  description,
  data,
}) => {
  return (
    <div className="mdx-event-profile-list__container">
      {title && (
        <Typography
          variant="h2"
          component="h2"
          className="mdx-event-profile-list__title"
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="subtitle1">{description}</Typography>
      )}
      <Box top={40}>
        <Grid xs={{ cols: 1, gap: '16px' }} md={{ cols: 3 }}>
          {data.map((event, index) => (
            <Grid.Item xs={1} key={index}>
              <EventProfile {...event} />
            </Grid.Item>
          ))}
        </Grid>
      </Box>
    </div>
  )
}
