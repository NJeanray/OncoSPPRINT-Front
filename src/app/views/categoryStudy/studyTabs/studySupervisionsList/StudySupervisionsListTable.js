import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton/index'

import StyledTable from 'app/components/styledTable'

const StudySupervisionsListTable = ({
  studyState,
  handleSelectStudySupervision,
  studySupervisionsTable
}) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>{<FormattedMessage id="studySupervision.type" />}</TableCell>
          <TableCell align="left">
            {<FormattedMessage id="studySupervision.workingTime" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="studySupervision.mspLaboratory" />}
          </TableCell>
          <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(studySupervisionsTable) &&
          studySupervisionsTable.map((row, index) => {
            const studySupervisionType = row.type.replace(/\s+/, '')

            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <b>
                    <FormattedMessage id={`studySupervision.${studySupervisionType}`} />
                  </b>
                </TableCell>
                <TableCell align="left">
                  {row.workers.map(worker => {
                    return worker && worker.working_time !== undefined ? (
                      <div key={worker.labo_msp_id}>{worker.working_time} heures</div>
                    ) : (
                      <div />
                    )
                  })}
                </TableCell>
                <TableCell align="left">
                  {row.workers.map(worker => {
                    return worker && worker.labo_msp_name ? (
                      <div key={worker.mspLaboratoryId}>{worker.labo_msp_name}</div>
                    ) : (
                      <div />
                    )
                  })}
                </TableCell>
                <TableCell align="left">
                  {studyState !== 'amended' && (
                    <IconButton
                      onClick={() => handleSelectStudySupervision(row.id)}
                      aria-label="delete"
                      size="small"
                      style={{ padding: '10px' }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </StyledTable>
  )
}

export default StudySupervisionsListTable
