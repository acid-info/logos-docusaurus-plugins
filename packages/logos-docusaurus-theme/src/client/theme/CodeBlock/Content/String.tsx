import React, { ReactElement } from 'react'
import clsx from 'clsx'
import { useThemeConfig, usePrismTheme } from '@docusaurus/theme-common'
import {
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
  containsLineNumbers,
  useCodeWordWrap,
} from '@docusaurus/theme-common/internal'
import { Highlight } from 'prism-react-renderer'
import Line from '@theme/CodeBlock/Line'
import CopyButton from '@theme/CodeBlock/CopyButton'
import WordWrapButton from '@theme/CodeBlock/WordWrapButton'
import Container from '../Container'
import type { Props } from '@theme/CodeBlock/Content/String'

import styles from './styles.module.css'
import { Typography } from '@acid-info/lsd-react'

export default function CodeBlockString({
  children,
  className: blockClassName = '',
  metastring,
  title: titleProp,
  showLineNumbers: showLineNumbersProp,
  language: languageProp,
}: Props): ReactElement {
  const {
    prism: { defaultLanguage, magicComments },
  } = useThemeConfig()
  const language =
    languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage
  const prismTheme = usePrismTheme()
  const wordWrap = useCodeWordWrap()

  // We still parse the metastring in case we want to support more syntax in the
  // future. Note that MDX doesn't strip quotes when parsing metastring:
  // "title=\"xyz\"" => title: "\"xyz\""
  const title = parseCodeBlockTitle(metastring) || titleProp

  const { lineClassNames, code } = parseLines(children, {
    metastring,
    language,
    magicComments,
  })
  const showLineNumbers = showLineNumbersProp ?? containsLineNumbers(metastring)

  return (
    <Container
      as="div"
      className={clsx(
        blockClassName,
        language &&
          !blockClassName.includes(`language-${language}`) &&
          `language-${language}`,
      )}
    >
      {title && (
        <div className={styles.codeBlockTitle}>
          <Typography variant="subtitle1">{title}</Typography>
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Highlight theme={prismTheme} code={code} language={language ?? 'text'}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre
              /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
              tabIndex={0}
              ref={wordWrap.codeBlockRef}
              className={clsx(className, styles.codeBlock, 'thin-scrollbar')}
            >
              <code
                className={clsx(
                  styles.codeBlockLines,
                  showLineNumbers && styles.codeBlockLinesWithNumbering,
                )}
              >
                {tokens.map((line, i) => (
                  <Line
                    key={i}
                    line={line}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                    classNames={lineClassNames[i]}
                    showLineNumbers={showLineNumbers}
                  />
                ))}
              </code>
            </pre>
          )}
        </Highlight>
        <div className={styles.buttonGroup}>
          {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
            <WordWrapButton
              className={styles.codeButton}
              onClick={() => wordWrap.toggle()}
              isEnabled={wordWrap.isEnabled}
            />
          )}
          <CopyButton className={styles.codeButton} code={code} />
        </div>
      </div>
    </Container>
  )
}
