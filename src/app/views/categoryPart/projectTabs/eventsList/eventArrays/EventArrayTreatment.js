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

const TreatmentDisplay = ({ index, text }) =>
  text ? (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ width: '100%', fontSize: '15px' }}>
        <b>Composé n°{index + 1}</b>
      </div>
      {text}
    </div>
  ) : (
    <div />
  )

const EventArrayTreatment = ({
  disabledBtn,
  handleView,
  eventsData,
  handleModify,
  handleDelete
}) => {
  return (
    <StyledTable aria-label="simple table" verticalAlign="baseline">
      <TableHead>
        <TableRow>
          <TableCell align="left">{<FormattedMessage id="global.input.group" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="events.timepoint" />}</TableCell>
          <TableCell align="left">{<FormattedMessage id="eventTreatmentForm.type" />}</TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventTreatmentForm.treatment" />}
          </TableCell>
          <TableCell align="left">{<FormattedMessage id="events.animalsNumber" />}</TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventTreatmentForm.DoseNumber" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventTreatmentForm.volumeFix" />}
          </TableCell>
          <TableCell align="left">
            {<FormattedMessage id="eventTreatmentForm.VolumeNumber" />}
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
                <TableCell align="left">{row.brick_name}</TableCell>
                <TableCell align="left">
                  {row.untreated && <FormattedMessage id="eventTreatmentForm.untreatedGroup" />}
                  {row.vehicule && (
                    <div>
                      <FormattedMessage id="eventTreatmentForm.placebo" />
                    </div>
                  )}
                  {!row.untreated &&
                    row.treatments &&
                    row.treatments.map((item, index) => (
                      <TreatmentDisplay index={index} text={item.treatment_name} />
                    ))}
                  {!row.untreated &&
                    row.treatments &&
                    row.treatments.map((item, index) => (
                      <TreatmentDisplay index={index} text={item.customer_compound} />
                    ))}
                </TableCell>
                <TableCell align="left">
                  {row.untreated
                    ? row.nb_animals
                    : row.treatments &&
                      row.treatments.map((item, index) => (
                        <TreatmentDisplay index={index} text={item.nb_animals} />
                      ))}
                </TableCell>
                <TableCell align="left">
                  {row.treatments &&
                    row.treatments.map((item, index) => (
                      <TreatmentDisplay
                        index={index}
                        text={`${item.administration_dose} ${item.unity}`}
                      />
                    ))}
                </TableCell>
                <TableCell align="left">
                  {row.treatments &&
                    row.treatments.map((item, index) => (
                      <TreatmentDisplay index={index} text={item.treatment_volume} />
                    ))}
                </TableCell>
                <TableCell align="left">
                  {row.treatments &&
                    row.treatments.map((item, index) => (
                      <TreatmentDisplay index={index} text={item.administration_volume} />
                    ))}
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

export default EventArrayTreatment
