import React from 'react'

import StyledSecondAddBtn from 'app/components/styledSecondAddBtn'
import { Wrapper } from './BarAddBtn.styled'

const BarAddBtn = ({ handleClick, disabledBtn, text }) => {
  return (
    <Wrapper>
      <StyledSecondAddBtn disabled={disabledBtn} onClick={handleClick} text={text} />
    </Wrapper>
  )
}

export default BarAddBtn
