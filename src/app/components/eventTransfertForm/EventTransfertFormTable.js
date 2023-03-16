import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { FormattedMessage } from 'react-intl'
import TableBody from '@material-ui/core/TableBody'
import { isEmpty } from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import StyledTable from 'app/components/styledTable'

const EventTransfertFormTable = ({ disabled, handleDelete, fragmentsToTransfert, samplesList }) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <FormattedMessage id="eventTransfertForm.groupName" />
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="eventTransfertForm.sample" />
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventTransfertForm.fragmentsToTransfert" />}
          </TableCell>
          <TableCell align="left">
            <FormattedMessage id="table.actions" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {samplesList &&
          !isEmpty(fragmentsToTransfert) &&
          fragmentsToTransfert.map((fragmentId, index) => {
            return (
              <TableRow key={fragmentId}>
                <TableCell align="left">
                  {samplesList.getIn([fragmentId.toString(), 'group_name'])}
                </TableCell>
                <TableCell align="left">
                  {samplesList.getIn([fragmentId.toString(), 'sample_name'])}
                </TableCell>
                <TableCell align="left">{`Conservation: ${samplesList.getIn([
                  fragmentId.toString(),
                  'conservation_brick_name'
                ])} | Température ${samplesList.getIn([
                  fragmentId.toString(),
                  'temperature'
                ])} `}</TableCell>
                <TableCell align="left">
                  {!disabled && (
                    <IconButton
                      onClick={() => handleDelete(index)}
                      size="small"
                      style={{ padding: '10px' }}
                    >
                      <DeleteIcon />
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

export default EventTransfertFormTable
