// @flow
import React from 'react'

import TextErrorWrapper from './TextError.styled'

type Props = {
  text: String
}

function TextError({ text }: Props) {
  return (
    <TextErrorWrapper my={2} p={1}>
      {text}
    </TextErrorWrapper>
  )
}

export default TextError
