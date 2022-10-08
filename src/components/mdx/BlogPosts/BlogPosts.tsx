import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import { Button } from '@site/src/components/Button'

type TProps = {
  children: React.ReactNode
}

const BlogPost = () => (
  <div className={clsx('card', styles.blogpost)}>
    <h3 className={'sans'}>Decentralizing Storage for Web3</h3>
    <p className={''}>
      Throughout the Web 2.0 era of the Internet, the distributed systems
      architecture adopted by large multinational technology corporations has
      led to the centralization of control over user-generated content.
    </p>
    <div className={styles.blogpostMeta}>
      <small className={'sans'}>by Leonardo Bautista-Gomez</small>
      <small>
        <time> - Jul 5, 2022</time>
      </small>
    </div>
    <a>
      <Button className={'button--secondary'}>Learn More</Button>
    </a>
  </div>
)

export const BlogPosts = ({ children }: TProps): JSX.Element => {
  return (
    <section className={styles.blogpostsWrapper}>
      <div className={styles.blogposts}>
        <BlogPost />
        <BlogPost />
      </div>
    </section>
  )
}
