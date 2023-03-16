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
import StyledTable from 'app/components/styledTable'
import ViewIcon from '@material-ui/icons/RemoveRedEye'

const EventArraySample = ({ handleView, disabledBtn, eventsData, handleModify, handleDelete }) => {
  return (
    <StyledTable aria-label="simple table" verticalAlign="baseline">
      <TableHead>
        <TableRow>
          <TableCell align="left">{<FormattedMessage id="global.input.group" />}</TableCell>
          <TableCell align="left" style={{ width: '300px' }}>
            {<FormattedMessage id="events.timepoint" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventSampleForm.sampleandFragments" />}
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
                  {row.tp &&
                    sortBy(row.tp, [tmpoint => Number(tmpoint.substring(1))]).map((item, index) =>
                      index !== row.tp.length - 1 ? `${item}, ` : item
                    )}
                </TableCell>
                <TableCell align="left">
                  {row.samples &&
                    row.samples.map(sample => {
                      return (
                        <div>
                          <div>
                            <big>
                              <b>
                                <u>{sample.sample_brick_name}</u>
                              </b>
                            </big>
                          </div>
                          <div>
                            <b>Fragments: </b>
                          </div>
                          {sample.fragments &&
                            sample.fragments.map((fragment, index) => (
                              <div style={{ marginBottom: '10px', marginLeft: '50px' }}>
                                {index + 1}. <b>Conservation:</b> {fragment.conservation_brick_name}{' '}
                                | <b>Temperature:</b> {fragment.temperature}
                                {fragment.destination && (
                                  <div>
                                    <b>
                                      <u>Destination:</u>
                                    </b>{' '}
                                    {fragment.destination}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )
                    })}
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

export default EventArraySample
