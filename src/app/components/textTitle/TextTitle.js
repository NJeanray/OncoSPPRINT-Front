// @flow
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  text: *,
  subTitle: ?*
}

const TextTitle = styled.div`
  ${({ theme: { fontSize } }) => css`
    font-size: ${fontSize['xs-large-font-size']};
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 20px;
    position: relative;

    .text-title__subtitle {
      position: absolute;
      left: 250px;
      font-size: ${fontSize['small-font-size']};
      letter-spacing: 2px;
    }
  `}
`

export default function({ text, subTitle = null }: Props) {
  return (
    <TextTitle>
      {text}
      {subTitle && <div className="text-title__subtitle">{subTitle}</div>}
    </TextTitle>
  )
}
