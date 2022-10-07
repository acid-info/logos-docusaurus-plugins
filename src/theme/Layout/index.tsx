import { globalStore } from '@site/src/containers/GlobalStore'
import Layout from '@theme-original/Layout'
import React from 'react'

export default function LayoutWrapper(props) {
  const store = globalStore.useCreateStore({ hiddenSidebar: false })

  return (
    <globalStore.Provider store={store}>
      <Layout {...props} />
    </globalStore.Provider>
  )
}
