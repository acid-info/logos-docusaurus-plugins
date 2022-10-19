import Layout from '@docusaurus/theme-classic/lib/theme/Layout'
import { globalStore } from '@logos-theme/containers/GlobalStore'
import React from 'react'
import './styles.scss'

export default function LayoutWrapper(props) {
  const store = globalStore.useCreateStore({ hiddenSidebar: false })

  return (
    <globalStore.Provider store={store}>
      <div className="background-underlay" />
      <Layout {...props} />
    </globalStore.Provider>
  )
}
