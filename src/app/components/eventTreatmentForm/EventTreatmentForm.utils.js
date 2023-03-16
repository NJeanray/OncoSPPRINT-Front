import { fromJS } from 'immutable'

export const brickCategory = 'TRAITEMENT'

export const treatmentObjInitialize = {
  isConsumable: true,
  administration_dose: null,
  administration_volume: null,
  from_customer: false,
  nb_animals: 0,
  shift: null,
  treatment_id: null,
  treatment_name: null,
  new_customer_compound: true,
  customer_compound: null,
  treatment_volume: null,
  unity: null,
  type: 'treatment'
}

export function initializeTreatmentsFromEventSelected(setTreatments, eventSelected) {
  const treatmentsToSet = eventSelected
    .get('treatments')
    .toJS()
    .map(treatment => {
      const treatmentObj = {
        id: treatment.id,
        isConsumable: !treatment.customer_compound,
        administration_dose: treatment.administration_dose,
        administration_volume: treatment.administration_volume,
        from_customer: treatment.from_customer,
        nb_animals: treatment.nb_animals,
        shift: treatment.shift,
        treatment_id: treatment.treatment_id,
        treatment_name: treatment.treatment_name,
        new_customer_compound: treatment.new_customer_compound,
        customer_compound: treatment.customer_compound,
        consumable_provider: treatment.consumable_provider,
        treatment_volume: treatment.treatment_volume,
        unity: treatment.unity,
        type: 'treatment'
      }

      return treatmentObj
    })

  setTreatments(fromJS(treatmentsToSet))
}
