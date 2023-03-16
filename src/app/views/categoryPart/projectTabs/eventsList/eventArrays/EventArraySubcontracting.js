import React from 'react'
import { FormattedMessage } from 'react-intl'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { isEmpty } from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import StyledTable from 'app/components/styledTable'
import ViewIcon from '@material-ui/icons/RemoveRedEye'

const EventArraySubcontracting = ({
  disabledBtn,
  handleView,
  eventsData,
  handleModify,
  handleDelete
}) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">{<FormattedMessage id="events.daysFromD0" />}</TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventSubcontractingForm.subcontractor" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventSubcontractingForm.quoteNumber" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventSubcontractingForm.cost" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventSubcontractingForm.description" />}
          </TableCell>
          <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(eventsData) &&
          eventsData.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="left">D{row.day}</TableCell>
                <TableCell align="left">{row.subcontractor_name}</TableCell>
                <TableCell align="left">{row.sales_quote}</TableCell>
                <TableCell align="left">{row.cost}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">
                  {!disabledBtn ? (
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
                  ) : (
                    <IconButton onClick={() => handleView(row.id)} size="small">
                      <ViewIcon />
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

export default EventArraySubcontracting
