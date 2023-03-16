import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const StyledTableContainer = styled(Container)`
 margin-top: 40px;
  ${props =>
    props.fetching === 'true' &&
    `
      display: flex;
      justify-content: center;
      padding-top: 200px;
    `};
    
    .MuiToolbar-root {
      padding: 20px;
    }
    
    .styled-table-container__header {
      float: right;
      margin-bottom: 20px;
    }
  }
`

export default StyledTableContainer
