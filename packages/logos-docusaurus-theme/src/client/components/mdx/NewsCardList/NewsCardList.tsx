import React, { useState } from 'react'
import './NewsCardList.scss'
import { Button } from '@acid-info/lsd-react'
import { Box, NewsCard, NewsCardProps, Grid } from '..'

export type NewsCardListProps = {
  data: NewsCardProps[]
}

const LIMIT = 8

export const NewsCardList: React.FC<NewsCardListProps> = ({
  data,
  ...props
}) => {
  const [showMore, setShowMore] = useState<boolean>(data?.length > LIMIT)
  const [count, setCount] = useState<number>(LIMIT)

  const handleShowMore = () => {
    setCount((prev) => prev + LIMIT)

    if (count + 6 >= data?.length) {
      setShowMore(false)
    }
  }

  return (
    <div className="mdx-news-card-list__container" {...props}>
      <div>
        <Box top={{ xs: 64 }} bottom={64}>
          <Grid xs={{ cols: 1, gap: '64px 16px' }} md={{ cols: 4 }}>
            {data.slice(0, count).map((news, index) => (
              <Grid.Item xs={1} key={index}>
                <NewsCard {...news} />
              </Grid.Item>
            ))}
          </Grid>
        </Box>
        {showMore && (
          <Button
            className="mdx-news-card-list__button"
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
