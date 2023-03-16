//@ flow
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  text: string
}

const TextSubhead = styled.div`
  ${({ theme: { fontSize, colors } }) => css`
    width: 100%;
    display: flex;
    font-size: ${fontSize['small-font-size']};
    letter-spacing: 1px;
    color: ${colors['purple-color']};
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 20px;
  `}
`

export default function({ text }: Props) {
  return <TextSubhead>{text}</TextSubhead>
}
