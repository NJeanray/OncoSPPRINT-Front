import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DownloadIcon from '@material-ui/icons/GetApp'
import TableBody from '@material-ui/core/TableBody'

import StyledTable from 'app/components/styledTable'

const DocumentsTable = ({ documentsTable, isDocumentFetching, getDocument }) => {
  const [isDocumentLoading, setIsDocumentLoading] = useState(-1)

  useEffect(() => {
    if (isDocumentLoading !== -1 && !isDocumentFetching) setIsDocumentLoading(-1)
  }, [isDocumentFetching, isDocumentLoading])

  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <FormattedMessage id="documentsTable.name" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="documentsTable.type" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="table.actions" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(documentsTable) &&
          documentsTable.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <b>{row.name}</b>
              </TableCell>
              <TableCell align="left">
                <FormattedMessage id={row.type} />
              </TableCell>
              <TableCell align="left">
                {isDocumentLoading !== row.id ? (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    style={{ padding: '10px' }}
                    onClick={() => {
                      setIsDocumentLoading(row.id)
                      getDocument('document', {
                        endpoint: row.documentEndpoint,
                        documentName: row.documentName,
                        fileExtension: row.fileExtension
                      })
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                ) : (
                  <div>
                    <FormattedMessage id="downloading" />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </StyledTable>
  )
}

export default DocumentsTable
