import { Typography } from '@acid-info/lsd-react'
import React from 'react'
import './TableView.scss'

interface TableItem {
  title: string
  description: string
}

interface TableViewProps {
  tableTitle?: string
  data: TableItem[]
}

export const TableView: React.FC<TableViewProps> = ({
  tableTitle = '',
  data,
  ...props
}) => {
  return (
    <div className="mdx-table-view" {...props}>
      {tableTitle?.length > 0 ? (
        <Typography
          className="mdx-table-view-table-title"
          component="h2"
          variant="h2"
        >
          {tableTitle}
        </Typography>
      ) : null}
      <div>
        {data.map((item, index) => (
          <div key={index} className="mdx-table-view-row">
            <Typography
              component="h3"
              variant="h4"
              className="mdx-table-view-title"
            >
              {item.title}
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              className="mdx-table-view-description"
            >
              {item.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
