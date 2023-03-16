// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'

type Props = {
  text: string,
  onClick: () => void,
  disabled: boolean
}

const StyledSecondAddBtn = styled(Button)`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      background-color: transparent;
      color: ${colors['dark-navy-color']};
      font-weight: bold;
      letter-spacing: 3px;
      border-radius: 45px;
      padding: 2px 45px;
      border: 1px solid ${colors['grey-color']};
      &:hover {
        color: ${colors['purple-color']};
        background-color: transparent;
      }

      .btn-plus {
        font-size: ${fontSize['medium-font-size']};
      }

      .btn-text {
        margin-left: 10px;
        text-transform: uppercase;
        font-size: ${fontSize['small-font-size']};
      }
    `}
`

export default function({ text, onClick, disabled }: Props) {
  return (
    <StyledSecondAddBtn onClick={onClick} disabled={disabled}>
      <span className="btn-plus">+</span>
      <span className="btn-text">
        <FormattedMessage id={text} />
      </span>
    </StyledSecondAddBtn>
  )
}
