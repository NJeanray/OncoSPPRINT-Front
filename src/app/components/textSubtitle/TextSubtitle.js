//@ flow
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  text: string
}

const TextSubtitle = styled.div`
  ${({ theme: { fontSize, colors } }) => css`
    display: flex;
    font-size: ${fontSize['regular-font-size']};
    letter-spacing: 4px;
    color: ${colors['grey-color']};
    text-transform: uppercase;
    font-weight: bold;
    margin: 30px 0 20px;
  `}
`

export default function({ text }: Props) {
  return <TextSubtitle>{text}</TextSubtitle>
}
