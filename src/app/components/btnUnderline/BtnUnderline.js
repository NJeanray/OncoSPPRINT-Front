import React from 'react'

import BtnUnderlineWrapper from './BtnUnderline.styled'

const BtnUnderline = ({ text, onClick }) => {
  return (
    <BtnUnderlineWrapper onClick={onClick}>
      <div className="btn-underline__text">{text}</div>
    </BtnUnderlineWrapper>
  )
}

export default BtnUnderline
