import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Grid } from '@material-ui/core'

import ConsumableSelect from 'app/components/consumableSelect'
import CustomerCompounds from 'app/components/customerCompounds'
import RadioGroupField from 'app/components/radioGroupField/RadioGroupField'
import TextField from 'app/components/textField'

const RadioConsumableCustomerCompound = ({
  action,
  disabled = false,
  index,
  treatment,
  treatments,
  setTreatments
}) => {
  const [consumableToDisplay, setConsumableToDisplay] = useState(action === 'update')
  const [customerCompoundToDisplay, setCustomerCompoundToDisplay] = useState(action === 'update')

  return (
    <>
      {(action === 'create' || consumableToDisplay || customerCompoundToDisplay) && (
        <Grid item xs={12} style={{ marginTop: '40px' }}>
          <RadioGroupField
            formDisabled={disabled}
            label={<FormattedMessage id="eventTreatmentForm.choiceCustomableCompounds" />}
            labelRadioRight="eventTreatmentForm.customerCompounds"
            labelRadioLeft="eventTreatmentForm.consumable"
            value={treatment.get('isConsumable')}
            setValue={value =>
              setTreatments(treatments.updateIn([index.toString(), 'isConsumable'], () => value))
            }
            direction="column"
            align="flex-start"
          />
        </Grid>
      )}
      <Grid container spacing={4}>
        <Grid item xs>
          {treatment.get('isConsumable') ? (
            <>
              <ConsumableSelect
                disabled={disabled}
                consumableToDisplay={consumableToDisplay}
                setConsumableToDisplay={setConsumableToDisplay}
                consumableData={
                  treatment && treatment.get('treatment_id')
                    ? {
                        label: treatment.get('treatment_name'),
                        value: treatment.get('treatment_id')
                      }
                    : null
                }
                onSelect={(consumables, consumableSelected) => {
                  let libelleConsumable = null

                  if (consumableSelected)
                    libelleConsumable = consumables.getIn([
                      consumableSelected.value.toString(),
                      'libelle_fournisseur_principal'
                    ])
                      ? consumables.getIn([
                          consumableSelected.value.toString(),
                          'libelle_fournisseur_principal'
                        ])
                      : consumables.getIn([
                          consumableSelected.value.toString(),
                          'libelle_fournisseur'
                        ])

                  setTreatments(
                    treatments
                      .updateIn([index.toString(), 'customer_compound'], () => null)
                      .updateIn([index.toString(), 'treatment_id'], () =>
                        consumableSelected ? consumableSelected.value : null
                      )
                      .updateIn([index.toString(), 'treatment_name'], () =>
                        consumableSelected ? consumableSelected.label : null
                      )
                      .setIn([index.toString(), 'consumable_provider'], libelleConsumable)
                  )
                }}
                filter={{ type: 'treatment' }}
              />
              <TextField
                disabled
                value={
                  treatments.getIn([index.toString(), 'consumable_provider'])
                    ? treatments.getIn([index.toString(), 'consumable_provider'])
                    : ''
                }
                width="100%"
                label={<FormattedMessage id="consumable.provider" />}
                margin="normal"
              />
            </>
          ) : (
            <CustomerCompounds
              disabled={disabled}
              customerCompoundToDisplay={customerCompoundToDisplay}
              setCustomerCompoundToDisplay={setCustomerCompoundToDisplay}
              customerCompoundData={
                treatment && treatment.get('customer_compound')
                  ? {
                      label: treatment.get('customer_compound'),
                      value: treatment.get('customer_compound')
                    }
                  : null
              }
              customCompoundText={(treatment && treatment.get('customer_compound')) || null}
              onChangeRadio={value =>
                setTreatments(
                  treatments
                    .updateIn([index.toString(), 'new_customer_compound'], () => value)
                    .updateIn([index.toString(), 'customer_compound'], () => null)
                )
              }
              radioValue={treatments.getIn([index.toString(), 'new_customer_compound'])}
              onSelect={customerCompoundSelected => {
                setTreatments(
                  treatments
                    .updateIn([index.toString(), 'customer_compound'], () =>
                      customerCompoundSelected ? customerCompoundSelected.value : null
                    )
                    .updateIn([index.toString(), 'treatment_id'], () => null)
                )
              }}
              onChangeTextField={value =>
                setTreatments(
                  treatments
                    .updateIn([index.toString(), 'customer_compound'], () => value)
                    .updateIn([index.toString(), 'treatment_id'], () => null)
                )
              }
            />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <RadioGroupField
            formDisabled={disabled}
            label={<FormattedMessage id="eventTreatmentForm.providedByCustomer" />}
            value={treatment.get('from_customer')}
            setValue={value =>
              setTreatments(treatments.updateIn([index.toString(), 'from_customer'], () => value))
            }
            direction="row"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default RadioConsumableCustomerCompound
