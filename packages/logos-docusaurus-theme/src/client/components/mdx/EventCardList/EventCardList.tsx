import React, { useState } from 'react'
import './EventCardList.scss'
import { Button } from '@acid-info/lsd-react'
import { Box, EventCard, EventCardProps, Grid } from '..'

export type EventCardListProps = {
  data: EventCardProps[]
}

export const EventCardList: React.FC<EventCardListProps> = ({ data }) => {
  const [showMore, setShowMore] = useState<boolean>(data?.length > 6)
  const [count, setCount] = useState<number>(6)

  const handleShowMore = () => {
    setCount((prev) => prev + 6)

    if (count + 6 >= data?.length) {
      setShowMore(false)
    }
  }

  return (
    <div className="mdx-event-card-list__container">
      <Box top={56} bottom={80}>
        <Grid xs={{ cols: 1, gap: '80px 16px' }} md={{ cols: 2 }}>
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
  )
}
