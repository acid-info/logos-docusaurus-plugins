import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { globalStore } from '@site/src/containers/GlobalStore'
import Layout from '@theme-original/Layout'
import React from 'react'
import './styles.scss'

export default function LayoutWrapper(props) {
  const { pathname } = useLocation()
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext()

  const store = globalStore.useCreateStore({
    hiddenSidebar: pathname === baseUrl,
  })

  return (
    <globalStore.Provider store={store}>
      <div className="background-underlay" />
      <Layout {...props} />
    </globalStore.Provider>
  )
}
