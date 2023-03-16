import React, { useState, useEffect } from 'react'
import { fromJS, remove } from 'immutable'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'

import DeleteIcon from '@material-ui/icons/DeleteOutline'
import IconButton from '@material-ui/core/IconButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { mspLaboratoriesEndpoint } from 'app/api/endpoints'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import StyledButton from 'app/components/styledButton'
import CustomSpinner from 'app/components/customSpinner'
import Select from 'app/components/select/Select'
import TextField from 'app/components/textField'
import StudySupervisionFormWrapper from './StudySupervisionForm.styled'
import { displayStudySupervisionErrors } from './StudySupervisionForm.utils'

const StudySupervisionForm = ({
  isMspLaboratoriesFetching,
  isStudySupervisionsFetching,
  studySupervisionSelected,
  handleUpdateStudySupervision,
  fetchEntities,
  mspLaboratories,
  mspLaboratoriesName,
  hasStudySupervisionsErrors
}) => {
  const workerInitialize = {
    working_time: null,
    labo_msp_id: null
  }
  const [workers, setWorkers] = useState(fromJS([workerInitialize]))
  const [panelUpdatedIndex, setPanelUpdatedIndex] = useState(0)
  const studySupervisionType = studySupervisionSelected?.get('type').replace(/\s+/, '')

  useEffect(() => {
    if (!mspLaboratories)
      fetchEntities('mspLaboratories', {
        endpoint: mspLaboratoriesEndpoint()
      })
  }, [fetchEntities, mspLaboratories])

  const handleUpdate = () => {
    setPanelUpdatedIndex(-1)
    let workersParamsToSend = []

    if (workers.size !== 0)
      workersParamsToSend = workers
        .valueSeq()
        .map(worker => ({
          working_time: worker.get('working_time'),
          labo_msp_id: worker.get('labo_msp_id')
        }))
        .filter(worker => worker.job_title || worker.working_time || worker.labo_msp_id)
    handleUpdateStudySupervision(workersParamsToSend)
  }

  useEffect(() => {
    if (studySupervisionSelected && !isEmpty(studySupervisionSelected.get('workers'))) {
      setWorkers(fromJS(studySupervisionSelected.get('workers')))
    }
  }, [studySupervisionSelected])

  if (isStudySupervisionsFetching) return <CustomSpinner type="circle" />

  return (
    <StudySupervisionFormWrapper>
      {hasStudySupervisionsErrors &&
        displayStudySupervisionErrors(
          hasStudySupervisionsErrors.workers.filter(worker => !isEmpty(worker))
        )}
      <TextField
        disabled
        value={studySupervisionSelected.get('type')}
        width="100%"
        label={<FormattedMessage id="studySupervision.type" />}
        margin="normal"
      />
      <div className="btn__flex-end">
        <StyledMainAddBtn
          onClick={() => {
            const workersAdded = workers.set(workers.size, fromJS(workerInitialize))

            setWorkers(workersAdded)
          }}
        />
      </div>
      {workers.valueSeq().map((worker, index) => (
        <ExpansionPanel
          expanded={panelUpdatedIndex === index}
          onClick={() => setPanelUpdatedIndex(index)}
        >
          {panelUpdatedIndex !== index && (
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <FormattedMessage id="studySupervision.expansionPanelSummary" /> {index + 1}
              </Typography>
            </ExpansionPanelSummary>
          )}
          <ExpansionPanelDetails>
            <TextField
              label={
                <FormattedMessage id={`studySupervision.workingTime.${studySupervisionType}`} />
              }
              disabled={panelUpdatedIndex !== index}
              value={workers.getIn([index.toString(), 'working_time'])}
              type="number"
              margin="normal"
              width="100%"
              onChange={e => {
                const workersUpdated = workers.updateIn(
                  [index.toString(), 'working_time'],
                  () => e.target.value
                )

                setWorkers(workersUpdated)
              }}
            />
            <Select
              label="studySupervision.mspLaboratory"
              disabled={panelUpdatedIndex !== index}
              value={workers.getIn([index.toString(), 'labo_msp_id'])}
              onChange={e => {
                const workersUpdated = workers.updateIn(
                  [index.toString(), 'labo_msp_id'],
                  () => e.target.value
                )

                setWorkers(workersUpdated)
              }}
              options={mspLaboratoriesName}
              isLoading={isMspLaboratoriesFetching}
            />
            <div className="btn__flex-start">
              <IconButton
                onClick={() => {
                  const workersWithItemDeleted = remove(workers, index)

                  setWorkers(workersWithItemDeleted)
                }}
                size="small"
                style={{ padding: '10px' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <StyledButton onClick={handleUpdate}>
        <FormattedMessage id="global.action.modify" />
      </StyledButton>
    </StudySupervisionFormWrapper>
  )
}

export default StudySupervisionForm
