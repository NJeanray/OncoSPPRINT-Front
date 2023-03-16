import styled, { css } from 'styled-components'

import Radio from '@material-ui/core/Radio'

const StyledRadio = styled(Radio)`
  ${({ theme: { colors } }) => css`
    &&& {
      .MuiFormGroup-root {
        .MuiFormControlLabel-root {
          .MuiIconButton-root .Mui-disabled {
            color: rgba(0, 0, 0, 0.26);
          }
        }
      }
     
      .MuiIconButton-colorSecondary {
        
        .Mui-checked {
          color: ${colors['navy-blue-color']}
        }
      }
  `}
`

export default StyledRadio
