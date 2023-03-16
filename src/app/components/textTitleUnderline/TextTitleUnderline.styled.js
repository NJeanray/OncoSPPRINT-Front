import styled, { css } from 'styled-components'

const TextTitleUnderlineWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    font-size: ${fontSize['x-large-font-size']};
    color: ${props => (props.color ? props.color : colors['purple-color'])};
    letter-spacing: 4px;
    text-transform: uppercase;

    .underline {
      width: 90%;
      margin: 0 auto;
      padding-top: 20px;
      border-bottom: ${props =>
        props.color ? `2px solid ${props.color}` : `2px solid ${colors['purple-color']}`};
    }
  `}
`

export default TextTitleUnderlineWrapper
