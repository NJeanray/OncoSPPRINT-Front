import React from 'react'
import { FormattedMessage } from 'react-intl'

import DocumentsTable from './DocumentsTable'
import { documentsEndpoint } from 'app/api/endpoints'
import TextError from 'app/components/textError'

const Documents = ({
  studyId,
  projectCode,
  studyName,
  isDocumentFetching,
  getDocument,
  hasDocumentErrors
}) => {
  const documentsTable = [
    {
      id: 1,
      type: 'document.word',
      name: 'Summary design',
      documentName: `summary_design_${projectCode}_${studyName}`,
      fileExtension: 'docx',
      documentEndpoint: documentsEndpoint(studyId, 'summary_design')
    },
    {
      id: 2,
      type: 'document.word',
      name: 'Gonogo',
      documentName: `go_no_go_${projectCode}_${studyName}`,
      fileExtension: 'docx',
      documentEndpoint: documentsEndpoint(studyId, 'go_no_go')
    }
  ]

  return (
    <>
      {hasDocumentErrors && <TextError text={<FormattedMessage id="document.error" />} />}
      <DocumentsTable
        documentsTable={documentsTable}
        isDocumentFetching={isDocumentFetching}
        getDocument={getDocument}
      />
    </>
  )
}

export default Documents
