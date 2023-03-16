import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'

const EventCategoryWrapper = styled(Button)`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 30px;
      font-weight: bold;
      border: 2px solid ${colors['light-grey-color']};
      color: ${colors['navy-blue-color']};
      letter-spacing: 2px;
      cursor: pointer;
      text-transform: uppercase;
      background-color: ${props => (props.disabled ? colors['light-grey-color'] : 'white')};

      &:hover {
        background-color: ${colors['light-grey-color']};
      }
    }
  `}
`

export default EventCategoryWrapper
