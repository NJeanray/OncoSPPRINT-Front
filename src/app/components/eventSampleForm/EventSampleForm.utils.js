import getBrickIdRequest from 'app/utils/getBrickIdRequest'
import { fromJS } from 'immutable'

export const brickCategory = 'PRELEVEMENT,ABLATION'
export const brickWeightCategory = 'PESEE'
export const brickConservationCategory = 'CONSERVATION'

export const sampleObjInitialize = {
  sample_brick_name: null,
  weighing_brick_id: null,
  nb_animals: 0,
  blood_quantity: 0,
  isWeightBrickDisplayed: false,
  isBloodQuantityDisplayed: false,
  brickParams: {},
  fragments: []
}

export const checkToDisplayBloodQuantity = sampleNameSelected =>
  sampleNameSelected.toLowerCase().includes('prelevement sang')

export const checkToDisplayWeightBrick = (samplesState, sampleNameSelected) =>
  samplesState
    .valueSeq()
    .toJS()
    .filter(sample => sample.name === sampleNameSelected)[0].data?.pesable

export const getSampleFormPayload = async (
  action,
  eventSelected,
  partSite,
  samples,
  setHasbrickParamsError
) => {
  const payload = {}

  payload.samples = await Promise.all(
    samples.toJS().map(async sample => {
      const samplePayload = {
        nb_animals: sample.nb_animals,
        fragments: sample.fragments
      }

      if (sample.isBloodQuantityDisplayed) samplePayload.blood_quantity = sample.blood_quantity
      if (sample.isWeightBrickDisplayed) samplePayload.weighing_brick_id = sample.weighing_brick_id

      const sampleBrickId = await getBrickIdRequest(
        action,
        eventSelected,
        partSite,
        brickCategory,
        sample.sample_brick_name,
        sample.brickParams
      )

      if (sampleBrickId === -1) setHasbrickParamsError(true)
      else samplePayload.sample_brick_id = sampleBrickId

      if (action === 'update') samplePayload.id = sample.id
      return samplePayload
    })
  )

  return payload
}

export function initializeSamplesFromEventSelected(setSamples, eventSelected) {
  const samplesToSet = eventSelected
    .get('samples')
    .toJS()
    .map(sample => {
      const sampleObj = {
        id: sample.id,
        fragments: sample.fragments,
        sample_brick_name: sample.sample_brick_name,
        weighing_brick_id: sample.weighing_brick_id || null,
        nb_animals: sample.nb_animals,
        transfer_id: sample.transfer_id ? sample.transfer_id : null,
        brickParams: {}
      }

      sampleObj.isBloodQuantityDisplayed = !!sample.blood_quantity
      sampleObj.isWeightBrickDisplayed = !!sample.weighing_brick_id

      return sampleObj
    })

  setSamples(fromJS(samplesToSet))
}
