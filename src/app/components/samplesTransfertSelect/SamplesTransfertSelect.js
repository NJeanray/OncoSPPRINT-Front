import React, { useContext, useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import { Grid } from '@material-ui/core'

import { fragmentsEndpoint } from 'app/api/endpoints'
import { SamplesTransfertContext } from 'app/contexts/SamplesTransfertProvider'
import { PartContext } from 'app/contexts/PartProvider'
import Select from 'app/components/select'
import StyledButton from 'app/components/styledButton'

export function initializeSampleFragmentsOptions(sampleFragmentsOptions) {
  if (sampleFragmentsOptions.length === 0) return []
  if (sampleFragmentsOptions.length === 1) return sampleFragmentsOptions
  return [
    {
      value: 0,
      label: <FormattedMessage id="sampleTransfertSelect.allSamplesFragments" />
    },
    ...sampleFragmentsOptions
  ]
}

const initializeAllSampleFragments = [
  {
    value: 1,
    label: <FormattedMessage id="sampleTransfertSelect.allSamplesFragments" />
  }
]

export function initializeSamplesOptions(samplesOptions) {
  if (samplesOptions.length === 0) return []
  if (samplesOptions.length === 1) return samplesOptions
  return [
    {
      value: -1,
      label: 'Tous les prévèlements'
    },
    ...samplesOptions
  ]
}

const SamplesTransfertSelect = ({ fetchEntities, sampleOptions, sampleFragments, fragments }) => {
  const { partSelected } = useContext(PartContext)

  const {
    formDisabled,
    setFragmentsToTransfert,
    fragmentsToTransfert,
    setFragmentsSelected,
    fragmentsSelected,
    setSampleSelected,
    sampleSelected
  } = useContext(SamplesTransfertContext)
  const [isAllSampleSelected, setIsAllSampleSelected] = useState(false)
  const [sampleOptionsToDisplay, setSampleOptionsToDisplay] = useState([])
  const [sampleFragmentsOptions, setSampleFragmentOptions] = useState([])
  const getMultipleChipField = () =>
    fragmentsSelected.length === 1 && fragmentsSelected[0] === 1 ? 'label' : 'value'

  const fetchSampleFragments = useCallback(
    (stateField, params) => {
      fetchEntities(stateField, {
        endpoint: fragmentsEndpoint(),
        params: {
          part_id: partSelected.get('id'),
          ...params
        }
      })
    },
    [fetchEntities, partSelected]
  )

  useEffect(() => {
    if (sampleOptions) setSampleOptionsToDisplay(initializeSamplesOptions(sampleOptions))
  }, [sampleOptions])

  useEffect(() => {
    if (sampleFragments) setSampleFragmentOptions(initializeSampleFragmentsOptions(sampleFragments))
  }, [sampleFragments])

  useEffect(() => {
    fetchSampleFragments('samples', {
      transferred: 'False'
    })
    fetchSampleFragments('allSamples', {})
  }, [fetchSampleFragments])

  function handleAddFragments() {
    if (isAllSampleSelected) {
      const allFragments = Object.keys(fragments.toJS())

      setFragmentsToTransfert([...allFragments.map(item => Number(item))])
    } else {
      setFragmentsToTransfert([...fragmentsToTransfert, ...fragmentsSelected])
    }
    setFragmentsSelected([])
    setSampleSelected(null)
  }

  function onSelectSample(sampleSelectedId) {
    if (sampleSelectedId === -1) {
      setSampleSelected(-1)
      setSampleFragmentOptions(initializeAllSampleFragments)
    } else {
      setSampleSelected(sampleSelectedId)
      fetchSampleFragments('sampleFragments', {
        sample_id: sampleSelectedId,
        transferred: 'False'
      })
    }
    setFragmentsSelected([])
  }

  function onSelectSampleFragment(selectedFragments) {
    if (selectedFragments.includes(1)) {
      setFragmentsSelected(selectedFragments)
      setIsAllSampleSelected(true)
    } else {
      setIsAllSampleSelected(false)
      if (selectedFragments.includes(0)) {
        setSampleFragmentOptions(sampleFragmentsOptions.filter(fragment => fragment.value !== 0))
        setFragmentsSelected(sampleFragments.map(item => item.value))
      } else {
        setSampleFragmentOptions(initializeSampleFragmentsOptions(sampleFragments))
        setFragmentsSelected(selectedFragments)
      }
    }
  }

  function filterSampleFragments(options) {
    const sampleFragmentsFiltered = options.filter(
      item => !fragmentsToTransfert.includes(item.value)
    )

    if (sampleFragmentsFiltered.length === 1 && sampleFragmentsFiltered[0].value === 0) return []
    if (
      sampleFragmentsFiltered.length === 2 &&
      sampleFragmentsFiltered.find(item => item.value === 0)
    )
      return sampleFragmentsFiltered.splice(
        sampleFragmentsFiltered.indexOf(item => item.value === 0),
        1
      )
    return sampleFragmentsFiltered
  }

  return (
    <Grid container style={{ justifyContent: 'space-between' }}>
      <Grid item xs={4} style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Select
          disabled={formDisabled}
          label="eventTransfert.select.sample"
          value={sampleSelected}
          onChange={e => onSelectSample(e.target.value)}
          options={sampleOptionsToDisplay}
        />
      </Grid>
      <Grid item xs={4} ml={4}>
        {sampleSelected && (
          <Select
            disabled={formDisabled}
            multiple
            value={fragmentsSelected}
            onChange={e => onSelectSampleFragment(e.target.value)}
            label="eventTransfertForm.fragments"
            options={filterSampleFragments(sampleFragmentsOptions)}
            multipleChipField={getMultipleChipField()}
          />
        )}
      </Grid>
      {!formDisabled && (
        <Grid item xs={2} ml={4} style={{ marginTop: '10px', padding: '0 5px' }}>
          <StyledButton
            disabled={isEmpty(fragmentsSelected)}
            onClick={() => handleAddFragments()}
            variant="outlined"
          >
            <FormattedMessage id="global.action.add" />
          </StyledButton>
        </Grid>
      )}
    </Grid>
  )
}

export default SamplesTransfertSelect
