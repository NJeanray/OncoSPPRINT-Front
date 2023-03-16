import FormControl from '@material-ui/core/FormControl'
import styled, { css } from 'styled-components'

export const LabelStyled = styled.div`
  ${({ theme: { colors, fontSize }, direction }) => css`
    font-size: ${fontSize['small-font-size']};
    color: ${colors['purple-color']};
    letter-spacing: 2px;
    margin-bottom: ${direction === 'column' ? '8px' : '0px'};
    text-transform: uppercase;
  `}
`

export const FormControlStyled = styled(FormControl)`
  ${({ direction, align, content }) => css`
    && {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: ${direction};
      align-items: ${align};
      justify-content: ${content};
    }
  `}
`
