import styled, { css } from 'styled-components'

const BtnUnderlineWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    border-bottom: 1px solid ${colors['grey-color']};
    &:hover {
      cursor: pointer;
      border-color: ${colors['red-color']};
    }

    .btn-underline__text {
      text-transform: uppercase;
      font-size: ${fontSize['x-small-font-size']};
      color: ${colors['grey-color']};
      letter-spacing: 1px;
      &:hover {
        color: ${colors['red-color']};
      }
    }
  `}
`

export default BtnUnderlineWrapper
