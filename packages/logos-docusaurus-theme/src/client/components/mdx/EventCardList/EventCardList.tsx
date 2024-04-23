import React, { useState } from 'react'
import './EventCardList.scss'
import { Button } from '@acid-info/lsd-react'
import { Box, EventCard, EventCardProps, Grid } from '..'
import { TabItem, Tabs } from '@acid-info/lsd-react'

export type EventCardListProps = {
  current: EventCardProps[]
  past: EventCardProps[]
}

export enum EventStatus {
  CURRENT = 'Current',
  PAST = 'Past',
}

const LIMIT = 8

export const EventCardList: React.FC<EventCardListProps> = ({
  current,
  past,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState<EventStatus>(EventStatus.CURRENT)
  const data = activeTab === EventStatus.CURRENT ? current : past

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
        <TabItem key={'current'} name={`Current`}>
          {`Current`}
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
