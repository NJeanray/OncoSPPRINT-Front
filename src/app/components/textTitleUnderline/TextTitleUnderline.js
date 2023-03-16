// @flow
import React from 'react'

import TextTitleUnderlineWrapper from './TextTitleUnderline.styled'

type Props = {
  text: string
}

function TextTitleUnderline({ text }: Props) {
  return (
    <TextTitleUnderlineWrapper>
      {text}
      <div className="underline" />
    </TextTitleUnderlineWrapper>
  )
}

export default TextTitleUnderline
