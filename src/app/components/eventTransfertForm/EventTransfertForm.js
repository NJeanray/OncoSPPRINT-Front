import React, { useState, useContext, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Grid } from '@material-ui/core'

import { SamplesTransfertProvider } from 'app/contexts/SamplesTransfertProvider'
import AddressLaboratorySelect from 'app/components/addressLaboratorySelect'
import ListFormBtn from 'app/components/listFormBtn'
import TransportSelect from 'app/components/transportSelect'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import RadioGroupField from 'app/components/radioGroupField/RadioGroupField'
import StyledGrid from 'app/components/styledGrid'
import SamplesTransfertSelect from 'app/components/samplesTransfertSelect'
import TextField from 'app/components/textField'
import EventTransfertFormTable from './EventTransfertFormTable'

const EventTransfertForm = ({ samplesList }) => {
  const { action, formDisabled, handleCreateModify, eventSelected } = useContext(EventFormContext)
  const [isSampleFragmentDeleted, setIsSampleFragmentDeleted] = useState(false)
  const [isExternal, setIsExternal] = useState(true)
  const [isSondeUsed, setIsSondeUsed] = useState(false)
  const [sampleSelected, setSampleSelected] = useState(null)
  const [transportCountryName, setTransportCountryName] = useState(null)
  const [fragmentsToTransfert, setFragmentsToTransfert] = useState([])
  const [description, setDescription] = useState('')
  const [fragmentsSelected, setFragmentsSelected] = useState([])
  const [address, setAddress] = useState('')
  const [laboratoryId, setLaboratoryId] = useState(null)
  const handleDeleteFragmentToTransfert = fragmentSelectedIndex => {
    const fragmentsSelectedCopy = [...fragmentsToTransfert]
    fragmentsSelectedCopy.splice(fragmentSelectedIndex, 1)

    setFragmentsToTransfert(fragmentsSelectedCopy)
    setFragmentsSelected([])
    setSampleSelected(null)
  }

  useEffect(() => {
    if (eventSelected) {
      const countryName = eventSelected.get('transport_country')

      setDescription(eventSelected.get('description'))
      setTransportCountryName(
        countryName.charAt(0).toUpperCase() + countryName.slice(1).toLowerCase()
      )
      setAddress(eventSelected.get('address'))
      setIsExternal(!eventSelected.has('laboratory_id'))
      setIsSondeUsed(eventSelected.get('option'))
      setLaboratoryId(eventSelected.get('laboratory_id'))
      setFragmentsToTransfert(eventSelected.get('fragment_ids').toJS())
    }
  }, [eventSelected])

  const handleClickBtn = () => {
    const payload = {
      description,
      transport_country: transportCountryName.toUpperCase(),
      address,
      laboratory_id: laboratoryId,
      fragment_ids: fragmentsToTransfert,
      option: isSondeUsed,
      brick_id: isExternal ? 143 : 130
    }

    if (action === 'create') payload.type = isExternal ? 'transfer_external' : 'transfer_intern'
    handleCreateModify(payload)
  }

  function initializeTransportDestination() {
    setTransportCountryName(null)
    setLaboratoryId(null)
    setAddress('')
    setDescription('')
  }

  return (
    <div style={{ width: '100%' }}>
      <RadioGroupField
        formDisabled={formDisabled}
        label={<FormattedMessage id="eventTransfertForm.TransfertType" />}
        labelRadioRight="eventTransfertForm.Internal"
        labelRadioLeft="eventTransfertForm.External"
        value={isExternal}
        setValue={value => {
          setIsExternal(value)
          initializeTransportDestination()
        }}
        direction="column"
        align="flex-start"
      />
      <SamplesTransfertProvider
        value={{
          formDisabled,
          sampleSelected,
          setSampleSelected,
          fragmentsSelected,
          setFragmentsSelected,
          fragmentsToTransfert,
          setFragmentsToTransfert,
          setIsSampleFragmentDeleted,
          isSampleFragmentDeleted
        }}
      >
        <SamplesTransfertSelect />
      </SamplesTransfertProvider>
      {!isEmpty(fragmentsToTransfert) && (
        <EventTransfertFormTable
          disabled={formDisabled}
          handleDelete={handleDeleteFragmentToTransfert}
          fragmentsToTransfert={fragmentsToTransfert}
          samplesList={samplesList}
        />
      )}
      <StyledGrid container>
        <TransportSelect
          disabled={formDisabled}
          isExternal={isExternal}
          eventSelected={eventSelected}
          action={action}
          transportCountryName={transportCountryName}
          setTransportCountryName={setTransportCountryName}
          setLaboratoryId={setLaboratoryId}
        />
        {!isExternal ? (
          <AddressLaboratorySelect
            disabled={formDisabled}
            transportCountryName={transportCountryName}
            address={address}
            setAddress={setAddress}
            setLaboratoryId={setLaboratoryId}
            laboratoryId={laboratoryId}
            action={action}
          />
        ) : (
          <TextField
            disabled={formDisabled}
            width="100%"
            label={<FormattedMessage id="eventTransfertForm.Address" />}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        )}
        <Grid item xs={12}>
          <TextField
            disabled={formDisabled}
            width="100%"
            multiline
            rowsMax="6"
            label={<FormattedMessage id="eventSubcontractingForm.description" />}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <RadioGroupField
            formDisabled={formDisabled}
            label={<FormattedMessage id="eventTransfer.sonde" />}
            labelRadioRight="global.boolean.no"
            labelRadioLeft="global.boolean.yes"
            value={isSondeUsed}
            setValue={value => {
              setIsSondeUsed(value)
            }}
            direction="row"
            content="space-between"
          />
        </Grid>
      </StyledGrid>
      {!formDisabled && (
        <ListFormBtn
          isBtnDisabled={isEmpty(fragmentsToTransfert)}
          action={action}
          handleCreate={handleClickBtn}
          handleModify={handleClickBtn}
        />
      )}
    </div>
  )
}

export default EventTransfertForm
