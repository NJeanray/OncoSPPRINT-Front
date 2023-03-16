import styled, { css } from 'styled-components'
import Table from '@material-ui/core/Table'

const StyledTable = styled(Table)`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      margin: 40px 0;
     
      .MuiTableHead-root {
        background-color: ${colors['table-header-color']};
        text-transform: uppercase;
        
       .MuiTableRow-root {
        height: 70px;
        
        .MuiTableCell-root {
          font-size: ${fontSize['x-small-font-size']};
          letter-spacing: 1px;
        }
       }
      }
      
      .MuiTableCell-root {
        border: none;
        color: ${colors['light-grey-color-2']};
        vertical-align: ${props =>
          props.verticalAlign ? props.verticalAlign : 'center'}; baseline;
        
        .cell-to-fill {
          font-style: italic;
        }
      }
      
      .MuiTableBody-root {
        border: 1px solid ${colors['table-header-color']};
        
        .MuiTableRow-root {
          height: 60px;
          
          &:hover {
            cursor: pointer;
            background-color: ${colors['table-header-color']};
          }
        }
      }
    `}
`

export default StyledTable
