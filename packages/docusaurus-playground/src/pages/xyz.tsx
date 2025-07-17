import { SubscriptionPage } from '@acid-info/logos-docusaurus-theme/lib/client/theme/SubscriptionPage'
import Head from '@docusaurus/Head'
import Layout from '@theme/Layout'
import React from 'react'

export default () => {
  const LPE_NEWSLETTER_ID = '6835cf08531d570001068824'

  return (
    <Layout title="Subscribe to our newsletter">
      <Head>
        <meta name="og:image_title" content="Subscribe to our newsletter" />
        <meta name="og:generate_image" content="false" />
      </Head>
      <SubscriptionPage buType="logos" newsletterId={LPE_NEWSLETTER_ID} />
    </Layout>
  )
}
