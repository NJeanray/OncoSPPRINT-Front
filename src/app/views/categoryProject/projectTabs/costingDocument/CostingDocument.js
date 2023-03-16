import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import DownloadIcon from '@material-ui/icons/GetApp'

import StyledModal from 'app/components/styledModal'
import { costingDocumentEndpoint } from 'app/api/endpoints'
import StyledTable from 'app/components/styledTable'
import TextError from 'app/components/textError'
import TextTitle from 'app/components/textTitle/TextTitle'
import TextField from 'app/components/textField'
import StyledButton from 'app/components/styledButton'

const CostingDocument = ({
  hasDocumentErrors,
  projectSelected,
  getDocument,
  isDocumentFetching
}) => {
  const [displayModalPercent, setDisplayModalPercent] = useState(false)
  const [costingPercent, setCostingPercent] = useState(15)
  const costingDocument = {
    id: 1,
    type: 'Document Excel',
    name: 'Costing',
    documentName: `costing_${projectSelected.get('project_code')}`,
    fileExtension: 'xlsx',
    documentEndpoint: costingDocumentEndpoint(projectSelected.get('id'))
  }

  function handleSavePercent() {
    getDocument('document', {
      endpoint: costingDocument.documentEndpoint,
      documentName: costingDocument.documentName,
      fileExtension: costingDocument.fileExtension,
      params: {
        gestion: costingPercent
      }
    })
    setDisplayModalPercent(false)
  }

  return (
    <>
      {hasDocumentErrors && <TextError text={<FormattedMessage id="document.error" />} />}
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{<FormattedMessage id="documentsTable.name" />}</TableCell>
            <TableCell align="left">{<FormattedMessage id="documentsTable.type" />}</TableCell>
            <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <b>{costingDocument.name}</b>
            </TableCell>
            <TableCell align="left">{costingDocument.type}</TableCell>
            <TableCell align="left">
              {!isDocumentFetching ? (
                <IconButton
                  aria-label="delete"
                  size="small"
                  style={{ padding: '10px' }}
                  onClick={() => setDisplayModalPercent(true)}
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
        </TableBody>
      </StyledTable>
      <StyledModal open={displayModalPercent} onClose={() => setDisplayModalPercent(false)}>
        <TextTitle text={<FormattedMessage id="costingDocument.costingPercent" />} />
        <TextField
          width="100%"
          required
          type="number"
          label=""
          value={costingPercent}
          onChange={e => setCostingPercent(e.target.value)}
          inputProps={{
            onInput: e => {
              e.target.value = Number(e.target.value)
            }
          }}
        />
        <StyledButton onClick={handleSavePercent} style={{ marginTop: '50px' }}>
          <FormattedMessage id="global.action.save" />
        </StyledButton>
      </StyledModal>
    </>
  )
}

export default CostingDocument
