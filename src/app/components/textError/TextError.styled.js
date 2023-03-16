import styled, { css } from 'styled-components'

import Box from '@material-ui/core/Box'

const TextTitleUnderlineWrapper = styled(Box)`
  ${({ theme: { colors, fontSize } }) => css`
    font-size: ${fontSize['regular-font-size']};
    color: ${colors['red-color']};
    background-color: rgba(252, 13, 27, 0.3);
    }
  `}
`

export default TextTitleUnderlineWrapper
