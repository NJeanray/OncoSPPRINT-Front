import React from 'react'
import { FormattedMessage } from 'react-intl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import StyledRadio from 'app/components/styledRadio'
import { LabelStyled, FormControlStyled } from './RadioGroupField.styled'

type Props = {
  formDisabled: boolean,
  radioDisabled: boolean,
  label: string,
  value: any,
  setValue: (value: any) => void,
  labelRadioLeft: string,
  labelRadioRight: string,
  direction: 'row' | 'column',
  align: 'center' | 'flex-start' | 'flex-end',
  content: 'center' | 'flex-start' | 'flex-end' | 'space-between'
}

const RadioGroupField = ({
  formDisabled = false,
  radioDisabled = false,
  label,
  value,
  setValue,
  labelRadioLeft = 'global.boolean.yes',
  labelRadioRight = 'global.boolean.no',
  isRightRadioDisabled = false,
  isLeftRadioDisabled = false,
  direction,
  align,
  content
}: Props) => {
  const handleChange = event => {
    const valueToSend = event.target.value === 'true'

    setValue(valueToSend)
  }

  return (
    <>
      <FormControlStyled direction={direction} align={align} content={content}>
        <LabelStyled direction={direction}>{label}</LabelStyled>
        <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
          <FormControlLabel
            value
            control={
              <StyledRadio
                color="primary"
                disabled={radioDisabled || formDisabled || isLeftRadioDisabled}
              />
            }
            label={<FormattedMessage id={labelRadioLeft} />}
            labelPlacement="end"
          />
          <FormControlLabel
            value={false}
            control={
              <StyledRadio color="primary" disabled={formDisabled || isRightRadioDisabled} />
            }
            label={<FormattedMessage id={labelRadioRight} />}
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControlStyled>
    </>
  )
}

export default RadioGroupField
