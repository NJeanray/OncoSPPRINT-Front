import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'

import StyledTable from 'app/components/styledTable'

const CustomTasksListTable = ({ disabledBtn, handleDelete, handleModify, customTasksTable }) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">{<FormattedMessage id="customTask.hours" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="customTask.task" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="customTask.mspLaboratory" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(customTasksTable) &&
          customTasksTable.map(row => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.hours ? `${row.hours} heures` : ''}</TableCell>
              <TableCell align="left">{row.task}</TableCell>
              <TableCell align="left">{row.mspLaboratory.label}</TableCell>
              <TableCell align="left">
                {!disabledBtn && (
                  <>
                    <IconButton
                      onClick={() => handleModify(row.id)}
                      size="small"
                      style={{ padding: '10px', marginRight: '10px' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.id)}
                      size="small"
                      style={{ padding: '10px' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </StyledTable>
  )
}

export default CustomTasksListTable
