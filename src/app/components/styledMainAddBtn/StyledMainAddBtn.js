// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

type Props = {
  onClick: () => void,
  disabled: boolean
}

const StyledMainAddBtn = styled(Fab)`
  ${({ theme: { colors } }) => css`
    && {
      background-color: ${colors['purple-color']};
      color: white;

      &:hover {
        background-color: ${colors['dark-purple-color']};
      }
    }
  `}
`

export default function({ onClick, disabled = false }: Props) {
  return (
    <StyledMainAddBtn disabled={disabled} onClick={onClick} aria-label="btn-add">
      <AddIcon />
    </StyledMainAddBtn>
  )
}
