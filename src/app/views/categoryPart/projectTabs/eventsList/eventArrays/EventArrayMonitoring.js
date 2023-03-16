import React from 'react'
import { FormattedMessage } from 'react-intl'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { isEmpty, sortBy } from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import StyledTable from 'app/components/styledTable'
import ViewIcon from '@material-ui/icons/RemoveRedEye'

const EventArrayInduction = ({
  handleView,
  disabledBtn,
  eventsData,
  handleModify,
  handleDelete
}) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">{<FormattedMessage id="global.input.group" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="events.timepoint" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventMonitoring.type" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="group.nbAnimals" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventFrequency.nbPerDay" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventFrequency.nbPerWeek" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventFrequency.frequency" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventFrequency.repetition" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(eventsData) &&
          eventsData.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="left">{row.group_name}</TableCell>
                <TableCell align="left">
                  {row.tp &&
                    sortBy(row.tp, [tmpoint => Number(tmpoint.substring(1))]).map((item, index) =>
                      index !== row.tp.length - 1 ? `${item}, ` : item
                    )}
                </TableCell>
                <TableCell align="left">{row.brick_name}</TableCell>
                <TableCell align="left">{row.nb_animals}</TableCell>
                <TableCell align="left">{row.nb_per_day}</TableCell>
                <TableCell align="left">{row.nb_per_week}</TableCell>
                <TableCell align="left">{row.frequency}</TableCell>
                <TableCell align="left">{row.repetition}</TableCell>
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

export default EventArrayInduction
