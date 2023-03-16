import styled, { css } from 'styled-components'

// TODO finish here
export const LiStyledNested = styled.li`
  ${({ isSelected, theme: { fontSize } }) => css`
    .MuiListItemText-root {
      padding-left: 30px;

      .MuiTypography-body1 {
        font-size: ${fontSize['small-font-size']};
      }
    }
  `}
`
