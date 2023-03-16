import React from 'react'
import { WhisperSpinner } from 'react-spinners-kit'

import BarsSpinnerWrapper from './BarsSpinner.styled'

const BarsSpinner = () => (
  <BarsSpinnerWrapper>
    <WhisperSpinner size={80} frontColor="#1C253C" backColor="#000000" />
  </BarsSpinnerWrapper>
)

export default BarsSpinner
