import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty, sortBy } from 'lodash'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import SortIcon from '@material-ui/icons/Sort'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import StyledTable from 'app/components/styledTable'

const EventsListTable = ({
  disabledBtn,
  handleSort,
  handleDelete,
  handleModify,
  eventsTable,
  handleView
}) => {
  return (
    <>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{<FormattedMessage id="events.groupName" />}</TableCell>
            <TableCell>
              <>
                {<FormattedMessage id="events.category" />}
                <IconButton
                  onClick={() => handleSort('categoryName')}
                  size="small"
                  style={{ padding: '10px' }}
                >
                  <SortIcon />
                </IconButton>
              </>
            </TableCell>
            <TableCell>{<FormattedMessage id="events.type" />}</TableCell>
            <TableCell align="left">{<FormattedMessage id="events.timepoint" />}</TableCell>
            <TableCell align="left">
              <>
                {<FormattedMessage id="events.fixDateFrequency" />}
                <IconButton
                  onClick={() => handleSort('day')}
                  size="small"
                  style={{ padding: '10px' }}
                >
                  <SortIcon />
                </IconButton>
              </>
            </TableCell>
            <TableCell align="left">{<FormattedMessage id="table.actions" />}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(eventsTable) &&
            eventsTable.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.groupName}
                </TableCell>
                <TableCell component="th" scope="row">
                  <FormattedMessage id={`event.${row.type}`} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.brickNames
                    ? row.brickNames.map(brickName => <div>{brickName}</div>)
                    : row.brickName}
                </TableCell>
                <TableCell align="left">
                  {' '}
                  {row.tp &&
                    sortBy(row.tp, [tmpoint => Number(tmpoint.substring(1))]).map((item, index) =>
                      index !== row.tp.length - 1 ? `${item}, ` : item
                    )}
                </TableCell>
                <TableCell align="left">
                  {!isEmpty(row.periodicity) ? (
                    <FormattedMessage id={`eventListTable.periodicity.${row.periodicity.type}`} />
                  ) : (
                    row.day
                  )}
                </TableCell>
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
            ))}
        </TableBody>
      </StyledTable>
    </>
  )
}

export default EventsListTable
