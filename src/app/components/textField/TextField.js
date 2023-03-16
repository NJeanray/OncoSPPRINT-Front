import styled, { css } from 'styled-components'
import MuiTextField from '@material-ui/core/TextField'

const TextField = styled(MuiTextField)`
  ${({ theme: { colors, fontSize } }) => css`
  {
    width: ${props => (props.width ? props.width : '500px')};

    .MuiFormLabel-root {
      color: ${colors['purple-color']};
      text-transform: uppercase;
      font-size: ${fontSize['small-font-size']};
    }

    #password-input {
      font-size: ${fontSize['x-large-font-size']};
      color: ${colors['dark-purple-color']};
    }

    label + .MuiInput-formControl {
      font-size: ${fontSize['medium-font-size']};
      font-weight: ${props => (props.bold ? 'bold' : '500')};
    }

    .MuiInputBase-input {
      letter-spacing: ${props => (props.spacing ? '2px' : 'normal')};
      font-size: ${fontSize['regular-font-size']};
    }
  `}
`

export default TextField
