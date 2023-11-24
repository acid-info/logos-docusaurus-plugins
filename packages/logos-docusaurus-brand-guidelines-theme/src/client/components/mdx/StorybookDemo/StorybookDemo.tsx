import { Dropdown } from '@acid-info/lsd-react'
import { useColorMode } from '@docusaurus/theme-common'
import clsx from 'clsx'
import React, { useMemo, useRef, useState } from 'react'
import styles from './StoryBookDemo.module.scss'

const onIframeLoad = (iframe: HTMLIFrameElement) => {
  const handleIframeMessage = (event: MessageEvent) => {
    if (
      typeof event.data === 'string' &&
      event.data.includes('storyRendered')
    ) {
      // XXX: This if() block executes when storybook has finished rendering.
      // So if we ever want to implement a loading screen, this if() block may help.
      requestHeightFromIframe()
    } else if (event.data && event.data.type === 'iframeHeightResponse') {
      iframe.style.height = `${event.data.height}px`
    }
  }

  // Request height from the iframe
  const requestHeightFromIframe = () => {
    if (!iframe || !iframe.contentWindow) {
      return
    }

    iframe.contentWindow.postMessage(
      {
        type: 'requestHeight',
      },
      '*',
    )
  }

  window.addEventListener('message', handleIframeMessage)

  // The following setInterval is just a safety mechanism for the very unlikely case
  // of the iframe not sending a storyRendered message.
  setInterval(() => {
    requestHeightFromIframe()
  }, 1000)
}

type GlobalType = {
  name: string
  description: string
  defaultValue: string
  toolbar: {
    icon: string
    items: { title: string; value: string }[]
  }
}

type ComponentProperty = {
  name: string
  type: {
    name: 'enum'
    value: string[]
  }
  defaultValue?: string
}

export type GlobalControls = 'themeFont' | 'themeColor'

export type StorybookDemoProps = {
  name: string
  docId: string
  storyId: string
  storybookUrl: string
  globalTypes: Record<string, GlobalType>
  componentProperties: ComponentProperty[]
  globalControls?: GlobalControls[]
}

export const StorybookDemo: React.FC<StorybookDemoProps> = ({
  name,
  docId,
  storyId,
  storybookUrl,
  globalTypes,
  globalControls = ['themeColor', 'themeFont'],
  componentProperties = [],
}) => {
  const colorMode = useColorMode()

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [globalProps, setGlobalProps] = useState(
    Object.fromEntries(
      Object.entries(globalTypes).map(([name, prop]) => [
        name,
        name === 'themeColor'
          ? colorMode.colorMode.slice(0, 1).toUpperCase() +
            colorMode.colorMode.slice(1)
          : prop.defaultValue,
      ]),
    ),
  )

  const [props, setProps] = useState(
    Object.fromEntries(
      componentProperties.map((prop) => [prop.name, prop.defaultValue]),
    ),
  )

  const embedUrl = useMemo(() => {
    const el = iframeRef.current

    const url = el?.src
      ? new URL(el.src)
      : new URL('/iframe.html', storybookUrl as string)

    url.searchParams.set('id', docId)
    storyId && url.searchParams.set('storyId', storyId)
    url.searchParams.set('globals', 'themeColor:Dark;themeFont:sans-serif')
    url.searchParams.set('embedded', 'true')
    url.searchParams.set(
      'hide',
      'title,subtitle,toolbar' +
        (storyId ? ',description,canvas-border,code' : ''),
    )
    url.searchParams.set(
      'globalControls',
      globalControls && globalControls.length
        ? globalControls.join(',')
        : 'false',
    )

    return url.toString()
  }, [docId, storyId, globalProps, globalControls, props])

  return (
    <div className={clsx(styles.root, styles[globalProps.themeColor!])}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0 8px',
        }}
      >
        {Object.entries(globalTypes).map(([name, prop]) => (
          <Dropdown
            key={name}
            value={globalProps[name]}
            onChange={(value) =>
              setGlobalProps((state) => ({ ...state, [name]: value as string }))
            }
            options={prop.toolbar.items.map((i) => ({
              name: i.title,
              value: i.value,
            }))}
            triggerLabel={prop.name}
            label={prop.name}
          />
        ))}
        {componentProperties.map((prop) => (
          <Dropdown
            key={prop.name}
            value={props[prop.name]}
            onChange={(value) =>
              setProps((state) => ({ ...state, [prop.name]: value as string }))
            }
            options={prop.type.value.map((i) => ({
              name: i,
              value: i,
            }))}
            triggerLabel={prop.name}
            label={prop.name}
          />
        ))}
      </div>
      <div className={styles.iframeContainer}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          height={500}
          onLoad={() => {
            onIframeLoad(iframeRef.current!)
          }}
        />
      </div>
    </div>
  )
}
