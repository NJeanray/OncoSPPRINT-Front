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
import ViewIcon from '@material-ui/icons/RemoveRedEye'

import StyledTable from 'app/components/styledTable'

const EventArrayRandomisation = ({
  handleView,
  groups,
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
          <TableCell align="left">{<FormattedMessage id="events.daysFromD0" />}</TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventRandomizationForm.randomizationType" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventRandomization.animalBeforeRandomization" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventRandomization.animalAfterRandomization" />}
          </TableCell>
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
                  {' '}
                  {row.tp &&
                    sortBy(row.tp, [tmpoint => Number(tmpoint.substring(1))]).map((item, index) =>
                      index !== row.tp.length - 1 ? `${item}, ` : item
                    )}
                </TableCell>
                <TableCell align="left">
                  {row.randomization_criteria &&
                    row.randomization_criteria.map((item, index) => (
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ width: '100%', fontSize: '15px' }}>
                          <b>Critère n°{index + 1}</b>
                        </div>
                        {item.brick_name}
                      </div>
                    ))}
                </TableCell>
                <TableCell align="left">
                  {groups &&
                    groups.get('data') &&
                    row &&
                    row.group_id &&
                    groups.getIn(['data', row.group_id.toString(), 'nb_animals'])}
                </TableCell>
                <TableCell align="left">
                  {groups &&
                    groups.get('data') &&
                    row &&
                    row.group_id &&
                    groups.getIn(['data', row.group_id.toString(), 'nb_remaining_animals'])}
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
            )
          })}
      </TableBody>
    </StyledTable>
  )
}

export default EventArrayRandomisation
