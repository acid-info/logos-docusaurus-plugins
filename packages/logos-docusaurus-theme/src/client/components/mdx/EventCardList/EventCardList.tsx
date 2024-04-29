import React, { useState } from 'react'
import './EventCardList.scss'
import { Button, Typography } from '@acid-info/lsd-react'
import { Box, EventCard, EventCardProps, Grid } from '..'
import { TabItem, Tabs } from '@acid-info/lsd-react'

export type EventCardListProps = {
  upcoming: EventCardProps[]
  past: EventCardProps[]
}

export enum EventStatus {
  UPCOMING = 'Upcoming',
  PAST = 'Past',
}

const LIMIT = 8

export const EventCardList: React.FC<EventCardListProps> = ({
  upcoming,
  past,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState<EventStatus>(EventStatus.UPCOMING)
  const data = activeTab === EventStatus.UPCOMING ? upcoming : past

  const [showMore, setShowMore] = useState<boolean>(data?.length > LIMIT)
  const [count, setCount] = useState<number>(LIMIT)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as EventStatus)
    setCount(LIMIT)
    setShowMore(data?.length > LIMIT)
  }

  const handleShowMore = () => {
    setCount((prev) => prev + LIMIT)

    if (count + 6 >= data?.length) {
      setShowMore(false)
    }
  }

  return (
    <div className="mdx-event-card-list__container" {...props}>
      <Tabs
        activeTab={activeTab}
        onChange={handleTabChange}
        className="mdx-event-card-list__tabs"
      >
        <TabItem key={'upcoming'} name={`Upcoming`}>
          {`Upcoming`}
        </TabItem>
        <TabItem key={'past'} name={`Past`}>
          {`Past`}
        </TabItem>
      </Tabs>
      <div>
        <Box top={{ xs: 80, sm: 96 }} bottom={80}>
          <Grid xs={{ cols: 1, gap: '80px 16px' }} md={{ cols: 4 }}>
            {data.slice(0, count).map((event, index) => (
              <Grid.Item xs={1} key={index}>
                <EventCard {...event} />
              </Grid.Item>
            ))}
            {data.length === 0 ? (
              <Typography>No events found.</Typography>
            ) : null}
          </Grid>
        </Box>
        {showMore && (
          <Button
            className="mdx-event-card-list__button"
            onClick={handleShowMore}
            size="large"
          >
            See more
          </Button>
        )}
      </div>
    </div>
  )
}
