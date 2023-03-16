import styled, { css } from 'styled-components'

import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  ${({ theme: { colors } }) => css`
    && {
    ${({ bgcolor }) =>
      bgcolor &&
      bgcolor === 'red' &&
      `
      &:hover {
        background-color: ${colors['red-color']}
      }
    `};
    ${props =>
      props.isSwitch &&
      props.variant === 'contained' &&
      `
        background-color: ${colors['purple-color']};
      `}
    
    ${props =>
      props.isSwitch &&
      props.variant === 'outlined' &&
      `
        background-color: white;
        `}
    
    ${props =>
      !props.isSwitch &&
      props.variant !== 'outlined' &&
      `
      background-color: ${(props.bgcolor === 'primary' && colors['dark-purple-color']) ||
        (props.bgcolor === 'red' && colors['burgundy-color']) ||
        colors['purple-color']}
        `};
      width: 100%;
      color: ${props => (props.variant === 'outlined' ? colors['purple-color'] : 'white')};
      height: 48px;
      letter-spacing: 4px;
      font-weight: 600;
      
      ${({ variant }) =>
        variant &&
        variant === 'outlined' &&
        `
        border: 1px solid ${colors['purple-color']};
        &:hover {
          background-color: ${colors['purple-color']} ;
          color: white;
        }
      `}
      
       ${({ variant }) =>
         variant &&
         variant === 'contained' &&
         `
        border: 1px solid ${colors['purple-color']};
        
        &:hover {
         background-color: ${colors['purple-color']} ;
          color: white;
        }
      `}
       
        ${({ variant, disabled }) =>
          variant &&
          disabled &&
          variant === 'contained' &&
          `
                border: 1px solid rgba(0, 0, 0, 0.26);
      `}
      }
    }
  `}
`

export default StyledButton
