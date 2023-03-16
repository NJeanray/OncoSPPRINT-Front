import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import { fromJS, remove, removeIn } from 'immutable'
import { antibodiesEndpoint, eventEndpoint, eventChoiceFieldsEndpoint } from 'app/api/endpoints'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteCrossIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import BtnUnderline from 'app/components/btnUnderline'
import StyledTable from 'app/components/styledTable'
import StyledRadio from 'app/components/styledRadio'
import Select from 'app/components/select'
import TextField from 'app/components/textField'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { PartContext } from 'app/contexts/PartProvider'
import ListFormBtn from 'app/components/listFormBtn'
import EventFacsExVivoBCEWrapper from './EventFacsExVivoBCEForm.styled'
import { panelObjInitialize, initializeFromEventSelected } from './EventFacsExVivoBCEForm.utils'

const EventFacsExVivoBCEForm = ({
  isTransfertsLoading,
  standardPanels,
  antibodiesNames,
  fetchEntities,
  eventChoiceFields,
  transfertsList
}) => {
  const { partSelected } = useContext(PartContext)
  const { action, formDisabled, handleCreateModify, eventSelected } = useContext(EventFormContext)
  useEffect(() => {
    fetchEntities('antibodies', {
      endpoint: antibodiesEndpoint()
    })
    fetchEntities('transferts', {
      endpoint: eventEndpoint(),
      params: {
        part_id: partSelected.get('id'),
        types: 'transfer_external,transfer_intern',
        laboratory_name: 'BCE',
        is_linked_event: 'True'
      }
    })
  }, [fetchEntities, partSelected])

  useEffect(() => {
    if (!eventChoiceFields) {
      fetchEntities('eventChoiceFields', {
        endpoint: eventChoiceFieldsEndpoint(),
        common: true
      })
    }
  }, [eventChoiceFields, fetchEntities])

  const [transfertSelected, setTransfertSelected] = useState([])
  const [panels, setPanels] = useState(fromJS([panelObjInitialize]))
  const [modifying, setModifying] = useState(-1)
  const isBtnDisabled = false

  useEffect(() => {
    if (eventSelected && !isEmpty(standardPanels)) {
      initializeFromEventSelected(setPanels, setTransfertSelected, eventSelected, standardPanels)
    }
  }, [eventSelected, standardPanels])

  const handleClickBtn = () => {
    const payload = {
      transfer_ids: transfertSelected,
      panels: panels
        .map(item => ({
          name: item.get('name'),
          antibody_ids: item.get('antibody_ids').toJS()
        }))
        .toJS()
    }

    if (action === 'create') payload.type = 'facs_ex_vivo_bce'
    handleCreateModify(payload)
  }

  return (
    <EventFacsExVivoBCEWrapper>
      {!formDisabled && (
        <div className="btn__flex-start">
          {panels && panels.size < 4 && (
            <StyledMainAddBtn
              onClick={() => {
                const panelsAdded = panels.set(panels.size, fromJS(panelObjInitialize))
                setPanels(panelsAdded)
              }}
            />
          )}
        </div>
      )}
      <Select
        multiple
        disabled={formDisabled}
        label="eventFacsExVivoBCEForm.transferts"
        value={transfertSelected}
        onChange={e => setTransfertSelected(e.target.value)}
        options={transfertsList}
        multipleChipField="value"
        isLoading={isTransfertsLoading}
        htmlTag
      />
      {panels.valueSeq().map((panel, index) => {
        const panelAntibodiesSize = panel.get('antibody_ids').size

        return (
          <ExpansionPanel expanded={modifying === index} onClick={() => setModifying(index)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className="expansion-panel__summary-text">
                <FormattedMessage id="eventFacsExVivoBCEForm.expansionPanelSummary" /> n°{' '}
                {index + 1}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RadioGroup
                disabled={formDisabled}
                aria-label="position"
                name="position"
                value={panel.get('type')}
                onChange={e =>
                  setPanels(panels.updateIn([index.toString(), 'type'], () => e.target.value))
                }
                row
              >
                <FormControlLabel
                  value="standard"
                  control={<StyledRadio color="primary" />}
                  label="Panel standard"
                  labelPlacement="end"
                />
                <FormControlLabel
                  disabled
                  value="custom"
                  control={<StyledRadio color="primary" />}
                  label="Panel custom"
                  labelPlacement="end"
                />
              </RadioGroup>
              {panel.get('type') === 'custom' && (
                <TextField
                  label={<FormattedMessage id="eventFacsExVivoBCEForm.name" />}
                  disabled={modifying !== index || formDisabled}
                  value={panel.get('name')}
                  margin="normal"
                  width="100%"
                  onChange={e =>
                    setPanels(panels.updateIn([index.toString(), 'name'], () => e.target.value))
                  }
                />
              )}
              {panel.get('type') === 'standard' && (
                <Select
                  disabled={formDisabled}
                  label="eventFacsExVivoBCEForm.name"
                  value={panels.getIn([index.toString(), 'name'])}
                  onChange={e =>
                    setPanels(panels.updateIn([index.toString(), 'name'], () => e.target.value))
                  }
                  options={standardPanels}
                />
              )}
              <StyledTable aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">N°</TableCell>
                    <TableCell align="right">
                      <FormattedMessage id="eventFacsExVivoBCEForm.antibody" />
                    </TableCell>
                    <TableCell align="right">
                      {((panel.get('type') === 'standard' && panelAntibodiesSize < 2) ||
                        (panel.get('type') === 'custom' && panelAntibodiesSize < 12)) &&
                        !formDisabled && (
                          <IconButton size="small" style={{ padding: '10px' }}>
                            <AddIcon
                              onClick={() => {
                                const panelsAdded = panels.setIn(
                                  [
                                    index ? index.toString() : '0',
                                    'antibody_ids',
                                    panelAntibodiesSize.toString()
                                  ],
                                  ''
                                )
                                setPanels(panelsAdded)
                              }}
                            />
                          </IconButton>
                        )}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {panels
                    .getIn([index.toString(), 'antibody_ids'])
                    .map((antibody, antibodyIndex) => {
                      return (
                        <TableRow key={antibodyIndex}>
                          <TableCell align="left" component="th" scope="row">
                            {antibodyIndex + 1}
                          </TableCell>
                          <TableCell align="right">
                            <Select
                              disabled={formDisabled}
                              value={panels.getIn([
                                index.toString(),
                                'antibody_ids',
                                antibodyIndex.toString()
                              ])}
                              onChange={e => {
                                const panelsUpdated = panels.updateIn(
                                  [index.toString(), 'antibody_ids', antibodyIndex.toString()],
                                  () => e.target.value
                                )

                                setPanels(panelsUpdated)
                              }}
                              options={antibodiesNames}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {(panel.get('type') === 'standard' ||
                              (panel.get('type') !== 'standard' && antibodyIndex !== 0)) &&
                              !formDisabled && (
                                <IconButton
                                  onClick={() => {
                                    const panelsWithItemDeleted = removeIn(panels, [
                                      index.toString(),
                                      'antibody_ids',
                                      antibodyIndex.toString()
                                    ])

                                    setPanels(panelsWithItemDeleted)
                                  }}
                                  size="small"
                                  style={{ padding: '10px' }}
                                >
                                  <DeleteCrossIcon />
                                </IconButton>
                              )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </StyledTable>
              {index !== 0 && !formDisabled && (
                <div className="btn__flex-start">
                  <BtnUnderline
                    text={<FormattedMessage id="eventFacsExVivoBCEForm.deletePanel" />}
                    onClick={() => {
                      const panelsWithItemDeleted = remove(panels, index)

                      setPanels(panelsWithItemDeleted)
                    }}
                  />
                </div>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
      {!formDisabled && (
        <ListFormBtn
          isBtnDisabled={isBtnDisabled}
          action={action}
          handleCreate={handleClickBtn}
          handleModify={handleClickBtn}
        />
      )}
    </EventFacsExVivoBCEWrapper>
  )
}

export default EventFacsExVivoBCEForm
