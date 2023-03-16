import styled, { css } from 'styled-components'

const CustomConsumableWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      .cost-input__wrapper {
        position: relative;

        .cost-input__start-adornment {
          ${props =>
            !props.cost
              ? `display: none`
              : `
            position: absolute;
            left: -15px;
            bottom: 17px;
          `}
        }
      }
    }
  `}
`

export default CustomConsumableWrapper
