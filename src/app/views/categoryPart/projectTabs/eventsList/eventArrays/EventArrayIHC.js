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

const EventArrayIHC = ({ disabledBtn, handleView, eventsData, handleModify, handleDelete }) => {
  return (
    <StyledTable aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">{<FormattedMessage id="global.input.group" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="events.timepoint" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="events.transferType" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="event.transferAddress" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="event.transferCountry" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="event.transferredFragments" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventIHC.IHCMethods" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventIHC.blocNumber" />}</TableCell>
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
                  {row.transfers &&
                    row.transfers.map(transfer => (
                      <div>{<FormattedMessage id={`eventArrayFacs.${transfer.type}`} />}</div>
                    ))}
                </TableCell>
                <TableCell align="left">
                  {row.transfers && row.transfers.map(transfer => <div>{transfer.address}</div>)}
                </TableCell>
                <TableCell align="left">
                  {row.transfers &&
                    row.transfers.map(transfer => <div>{transfer.transport_country}</div>)}
                </TableCell>
                <TableCell align="left">
                  {row.transfers &&
                    row.transfers.map(transfer => {
                      return (
                        <div>
                          {transfer.fragments &&
                            transfer.fragments.map((fragment, index) => (
                              <div style={{ marginBottom: '10px', marginLeft: '50px' }}>
                                <div>
                                  <big>
                                    <b>{fragment.sample_name}</b>
                                  </big>
                                </div>
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
                  {<FormattedMessage id={`eventIHC.${row.ihc_type}`} />}
                </TableCell>
                <TableCell align="left">
                  {row.ihc_type === 'parafine_lames' && row.nb_coupe_block}
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

export default EventArrayIHC
